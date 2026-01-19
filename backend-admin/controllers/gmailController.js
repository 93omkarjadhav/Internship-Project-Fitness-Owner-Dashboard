const nodemailer = require('nodemailer'); // Import the new library
const { google } = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// 1. Generate Login URL
exports.getAuthUrl = (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly', // Read emails
    'https://www.googleapis.com/auth/gmail.modify' ,   // Modify (Star/Unstar/Trash)
    'https://www.googleapis.com/auth/gmail.send'
  ];
  const url = oauth2Client.generateAuthUrl({ access_type: 'offline',prompt: 'consent', scope: scopes });
  res.json({ url });
};

// 2. Handle Google Callback
exports.oauthCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    global.userTokens = tokens; // In production, save this to DB (users table)
    res.redirect('http://localhost:5173/inbox'); // Back to your React App
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).send('Authentication failed');
  }
};

exports.getRealEmails = async (req, res) => {
  try {
    if (!global.userTokens) return res.status(401).json({ message: 'Login required' });

    oauth2Client.setCredentials(global.userTokens);
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const { category } = req.query; 

    // --- THE FILTER LOGIC ---
    // 1. Exclude "Noise": No Promotions, Social, Forums, or Updates (Ads/Newsletters)
    const junkFilter = '-category:promotions -category:social -category:forums -category:updates';
    
    // 2. Include "Content": Must strictly contain "FitFare" or be related to work
    // (You can add more keywords like OR "Order" OR "Support")
    const keywordFilter = ' "VTEX" OR "FitFare" OR "Invoice" OR "Order" OR "Support" '; 

    // Combine them
    const strictFilter = junkFilter + keywordFilter;

    let query = '';

    switch (category) { 
      case 'Starred': 
        query = `is:starred ${strictFilter}`; 
        break;
      case 'Sent':    
        query = `in:sent ${strictFilter}`; 
        break;
      case 'Spam':    
        query = `in:spam`; // Show all spam regardless of content
        break;
      case 'Draft':   
        query = `in:draft ${strictFilter}`; 
        break;
      case 'Bin':     
        query = `in:trash ${strictFilter}`; 
        break;
      default:        
        // INBOX: Apply strict filter
        query = `in:inbox ${strictFilter}`; 
    }

    // Fetch the list from Google
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 15,
      q: query 
    });

    const messages = response.data.messages || [];

    // Get Details (Keep existing mapping logic)
    const fullEmails = await Promise.all(
      messages.map(async (msg) => {
        const details = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'metadata',
          metadataHeaders: ['From', 'Subject', 'Date']
        });

        const headers = details.data.payload.headers;
        const subject = headers.find(h => h.name === 'Subject')?.value || '(No Subject)';
        const fromRaw = headers.find(h => h.name === 'From')?.value || 'Unknown';
        const date = headers.find(h => h.name === 'Date')?.value;
        const senderName = fromRaw.split('<')[0].replace(/"/g, '').trim();

        // Determine Label for UI
        let uiLabel = 'Primary'; 
        const labelIds = details.data.labelIds || [];
        // Since we filtered out Social/Promotions, most will be Primary or Work
        if (labelIds.includes('CATEGORY_PERSONAL')) uiLabel = 'Work'; 
        if (labelIds.includes('IMPORTANT')) uiLabel = 'Primary';

        return {
          id: msg.id,
          sender_name: senderName,
          subject: subject,
          content: details.data.snippet,
          received_at: date,
          is_starred: labelIds.includes('STARRED') ? 1 : 0,
          is_read: !labelIds.includes('UNREAD'),
          label: uiLabel,
          category: category || 'Inbox'
        };
      })
    );

    res.json(fullEmails);

  } catch (error) {
    console.error('Gmail API Error:', error);
    res.status(500).json({ message: 'Failed to fetch emails' });
  }
};
exports.toggleStar = async (req, res) => {
  try {
    const { id } = req.params;
    oauth2Client.setCredentials(global.userTokens);
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // First, check if it is currently starred to toggle it
    const msg = await gmail.users.messages.get({ userId: 'me', id, format: 'minimal' });
    const isStarred = msg.data.labelIds.includes('STARRED');

    if (isStarred) {
      await gmail.users.messages.modify({ userId: 'me', id, resource: { removeLabelIds: ['STARRED'] } });
    } else {
      await gmail.users.messages.modify({ userId: 'me', id, resource: { addLabelIds: ['STARRED'] } });
    }

    res.json({ success: true, newStatus: !isStarred });
  } catch (error) {
    res.status(500).json({ message: 'Star toggle failed' });
  }
};

// 5. SEND EMAIL (THE "APP PASSWORD" METHOD) 3rd Attempt-passcode best
// This bypasses OAuth complexity and just works.
exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, message, attachments } = req.body;
    
    // We don't need to check global.userTokens anymore for sending!
    // But we keep the check if you want to protect the route.
    if (!global.userTokens) return res.status(401).json({ message: 'Login required' });

    // 1. Create Transporter using Standard SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'okj002608@gmail.com', // <--- REPLACE THIS with your email
        pass: 'udrlqqewmxzvaurm'  // <--- PASTE YOUR 16-CHAR APP PASSWORD HERE
      }
    });

    // 2. Define Options
    const mailOptions = {
      from: '"FitFare Admin" <okj002608@gmail.com>', // Custom Name + Email
      to: to,
      subject: subject,
      html: message,
      attachments: attachments ? attachments.map(file => ({
        filename: file.filename,
        content: file.content,
        encoding: 'base64'
      })) : []
    };

    // 3. Send
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Send Error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};