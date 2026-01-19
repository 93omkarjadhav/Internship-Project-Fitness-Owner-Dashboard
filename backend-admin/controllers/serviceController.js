// server-admin/controllers/serviceController.js
const db = require('../config/db');
const {cloudinary} = require('../config/cloudinary');

// @route   GET /api/admin/services
// @desc    Get all services with their images
// exports.getAllServices = async (req, res) => {
//   try {
//     // 1. Get all services details
//     const [services] = await db.query('SELECT * FROM services');

//     // 2. Get all images
//     const [images] = await db.query('SELECT * FROM service_images');

//     // 3. Combine them: Attach images array to each service object
//     const servicesWithImages = services.map(service => {
//       const serviceImages = images
//         .filter(img => img.service_id === service.id)
//         .map(img => img.image_url); // Just return the URLs string array
        
//       return { ...service, images: serviceImages };
//     });

//     res.json(servicesWithImages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

exports.getAllServices = async (req, res) => {
  try {
    // 1. Get all services
    const [services] = await db.query('SELECT * FROM services');

    // 2. Get all images
    const [images] = await db.query('SELECT * FROM service_images');

    // 3. ✨ NEW: Get Active Pricing Rules for TODAY
    // We check if CURDATE is within range, and if TIME matches (or is NULL)
    const [activeRules] = await db.query(`
      SELECT service_id, custom_price 
      FROM pricing_rules 
      WHERE CURDATE() BETWEEN start_date AND end_date
      AND (
        (start_time IS NULL AND end_time IS NULL) 
        OR 
        (CURTIME() BETWEEN start_time AND end_time)
      )
    `);

    // 4. Combine Data
    const servicesWithData = services.map(service => {
      // Images logic
      const serviceImages = images
        .filter(img => img.service_id === service.id)
        .map(img => img.image_url);

      // Pricing Logic: Check if this service has an active rule
      const activeRule = activeRules.find(r => r.service_id === service.id);
      
      return { 
        ...service, 
        // If active rule exists, override price. Otherwise use base price.
        price: activeRule ? activeRule.custom_price : service.price, 
        is_dynamic: !!activeRule, // Flag to show UI badge (optional)
        images: serviceImages 
      };
    });

    res.json(servicesWithData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
// @route   PUT /api/admin/services/:id/details
// @desc    Update service name, description, and price
exports.updateServiceDetails = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    await db.query(
      'UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?',
      [name, description, price, id]
    );
    res.json({ msg: "Service updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error updating service');
  }
};

// @route   POST /api/admin/services/:id/images
// @desc    Upload multiple images for a service to Cloudinary
exports.uploadServiceImages = async (req, res) => {
    const { id: serviceId } = req.params;
    const files = req.files; // Array of files from multer

    if (!files || files.length === 0) {
        return res.status(400).json({ msg: "No images uploaded" });
    }

    try {
        const uploadedUrls = [];

        // 1. Loop through files and upload to Cloudinary concurrently
        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'fitfare_services' }, // Cloudinary folder name
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                uploadStream.end(file.buffer);
            });
        });

        const cloudinaryUrls = await Promise.all(uploadPromises);

        // 2. Insert URLs into MySQL database
        const insertPromises = cloudinaryUrls.map(url => {
             return db.query(
                'INSERT INTO service_images (service_id, image_url) VALUES (?, ?)',
                [serviceId, url]
             );
        });

        await Promise.all(insertPromises);

        res.json({ msg: `${files.length} images uploaded successfully`, urls: cloudinaryUrls });

    } catch (err) {
        console.error("Cloudinary/DB Error:", err);
        res.status(500).send('Failed to upload images');
    }
};