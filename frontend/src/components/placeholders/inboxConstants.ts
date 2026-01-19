export interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  time: string;
  label: "Primary" | "Work" | "Friends" | "Social" | null;
  isStarred: boolean;
  read: boolean;
}

export interface FolderItem {
  id: string;
  label: string;
  count: number | string; // string for '09' format
  icon: string; // We'll map string names to SVGs in the component
  isActive?: boolean;
}

export interface LabelItem {
  id: string;
  label: string;
  color: string; // Hex code for the dot
}

export const EMAIL_FOLDERS: FolderItem[] = [
  { id: "inbox", label: "Inbox", count: 1253, icon: "Inbox", isActive: true },
  { id: "starred", label: "Starred", count: 245, icon: "Star" },
  { id: "sent", label: "Sent", count: "24,532", icon: "Sent" },
  { id: "draft", label: "Draft", count: "09", icon: "Draft" },
  { id: "spam", label: "Spam", count: 14, icon: "Spam" },
  { id: "important", label: "Important", count: 18, icon: "Important" },
  { id: "bin", label: "Bin", count: 9, icon: "Bin" },
];

export const EMAIL_LABELS: LabelItem[] = [
  { id: "primary", label: "Primary", color: "#00B69B" }, // Green
  { id: "social", label: "Social", color: "#4880FF" },   // Blue
  { id: "work", label: "Work", color: "#FF9F43" },       // Orange
  { id: "friends", label: "Friends", color: "#FD71AF" }, // Pink/Purple
];

export const INBOX_DATA: EmailItem[] = [
  {
    id: "1",
    sender: "Jullu Jalal",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    label: "Primary",
    isStarred: false,
    read: true,
  },
  {
    id: "2",
    sender: "Minerva Barnett",
    subject: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    label: "Work",
    isStarred: false,
    read: true,
  },
  {
    id: "3",
    sender: "Peter Lewis",
    subject: "Vacation Home Rental Success",
    time: "7:52 PM",
    label: "Friends",
    isStarred: false,
    read: true,
  },
  {
    id: "4",
    sender: "Anthony Briggs",
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    label: null,
    isStarred: true, // Yellow star
    read: true,
  },
  {
    id: "5",
    sender: "Clifford Morgan",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    label: "Social",
    isStarred: false,
    read: true,
  },
  {
    id: "6",
    sender: "Cecilia Webster",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    label: "Friends",
    isStarred: false,
    read: true,
  },
  {
    id: "7",
    sender: "Harvey Manning",
    subject: "Curling Irons Are As Individual As The Women Who Use Them",
    time: "2:30 PM",
    label: null,
    isStarred: true,
    read: true,
  },
  {
    id: "8",
    sender: "Willie Blake",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    label: "Primary",
    isStarred: false,
    read: true,
  },
  {
    id: "9",
    sender: "Minerva Barnett",
    subject: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    label: "Work",
    isStarred: false,
    read: true,
  },
  {
    id: "10",
    sender: "Fanny Weaver",
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    label: null,
    isStarred: true,
    read: true,
  },
  {
    id: "11",
    sender: "Olga Hogan",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    label: "Social",
    isStarred: false,
    read: true,
  },
  {
    id: "12",
    sender: "Lora Houston",
    subject: "Vacation Home Rental Success",
    time: "7:52 PM",
    label: "Friends",
    isStarred: false,
    read: true,
  },
];