import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronRight, MessageCircle, Mail, Ticket, Play, 
  BookOpen, Users, ArrowLeft, Zap, 
  Shield, Smartphone, Settings, Cloud, LifeBuoy, FileText,
  ChevronDown, Clock, Eye, Star,
  CreditCard, Layout, Code,
  X, Send, Paperclip, Smile, Mic, Minus, Image as ImageIcon,
  HelpCircle
} from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import EmailSupportForm from './EmailSupportForm';

// --- TYPES ---
interface Product {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  stats: string;
  color: string;
  status: 'online' | 'maintenance';
}

interface SupportPageProps {
    onNavigate?: (view: string) => void;
}

// --- DATA ---
const STRIDE_PRODUCT: Product = {
    id: 'stride',
    name: 'Stride',
    category: 'Task Management',
    icon: <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>,
    stats: '500k+ users • 2h avg response',
    color: 'bg-black',
    status: 'online'
};

const POPULAR_FAQS = [
  { q: "Does Stride sync my tasks to the cloud?", a: "No. To ensure privacy and simplicity, all your data is stored locally on your device. We do not upload your tasks to any external servers." },
  { q: "Do I need an internet connection to use Stride?", a: "No. Stride is a \"local-first\" app, meaning it works perfectly offline. You can create tasks and use focus mode without any internet connection." },
  { q: "If I delete the app, will I lose my data?", a: "Yes. Because data is stored locally on your phone, uninstalling the app will permanently delete your tasks and history." },
  { q: "Can I use Stride on my computer (Web/Desktop)?", a: "Not yet. Stride is currently a mobile-only application for Android." }
];

const ALL_FAQS = [
  {
    category: "General Questions",
    items: [
      { q: "Is Stride really free?", a: "Yes! Stride is 100% free to download and use. There are no paywalls, subscriptions, or hidden fees." },
      { q: "Is there an iOS (iPhone) version?", a: "Currently, Stride is available exclusively for Android devices." },
      { q: "Does Stride show ads?", a: "No. We believe in a distraction-free environment, so there are no advertisements in the app." },
      { q: "Can I use Stride on my computer (Web/Desktop)?", a: "Not yet. Stride is currently a mobile-only application for Android." },
      { q: "Do I need an internet connection to use Stride?", a: "No. Stride is a \"local-first\" app, meaning it works perfectly offline. You can create tasks and use focus mode without any internet connection." }
    ]
  },
  {
    category: "Account & Data Privacy",
    items: [
      { q: "Does Stride sync my tasks to the cloud?", a: "No. To ensure privacy and simplicity, all your data is stored locally on your device. We do not upload your tasks to any external servers." },
      { q: "If I delete the app, will I lose my data?", a: "Yes. Because data is stored locally on your phone, uninstalling the app will permanently delete your tasks and history." },
      { q: "Can I transfer my data to a new phone?", a: "Currently, there is no automatic transfer feature. You will need to start fresh on a new device." },
      { q: "Why do I need to create an account if there is no cloud sync?", a: "Creating an account allows you to personalize your profile, track your streaks, and earn trophies. It also prepares your profile for future updates where cloud sync may be introduced." },
      { q: "How do I delete my account?", a: "Go to **Account**, scroll to the bottom, and tap \"Delete Account\". **Warning:** This will instantly erase all your data and it cannot be undone." },
      { q: "Does Stride sell my personal data?", a: "Never. Your data stays on your device, and we do not sell or share user information with third parties." }
    ]
  },
];

const VIDEOS = [
    { title: "Getting Started with Stride", duration: "3:45", desc: "Core concepts in under 4 minutes." },
    { title: "Mastering Focus Mode", duration: "5:20", desc: "Deep work techniques." }
];

const ACCOUNT_ARTICLES = [
    {
        section: "Account Management",
        items: [
            { id: "signup-login", title: "How to Sign Up or Log In to Stride", time: "2 min", views: "5,200", rating: "4.9" },
            { id: "switching-data", title: "Important: Switching Accounts and Your Data", time: "2 min", views: "8,500", rating: "5.0" },
            { id: "edit-profile", title: "How to Edit Your Profile Name", time: "1 min", views: "1,200", rating: "4.5" },
            { id: "change-password", title: "How to Change Your Password", time: "2 min", views: "2,300", rating: "4.7" },
            { id: "delete-account", title: "How to Delete Your Account", time: "1 min", views: "950", rating: "4.2" },
            { id: "stats-trophies", title: "Understanding Your Profile Stats and Trophies", time: "3 min", views: "6,400", rating: "4.8" },
        ]
    },
    {
        section: "App Settings",
        items: [
            { id: "notifications", title: "Managing Notifications", time: "2 min", views: "4,100", rating: "4.6" },
            { id: "appearance", title: "Customizing the App Appearance (Dark Mode)", time: "2 min", views: "3,400", rating: "4.8" },
            { id: "sound-haptics", title: "Sound Effects and Haptic Feedback", time: "2 min", views: "1,500", rating: "4.5" },
            { id: "battery-opt", title: "What is \"Battery Optimization\"?", time: "2 min", views: "2,100", rating: "4.4" },
            { id: "language", title: "Changing the App Language", time: "1 min", views: "800", rating: "4.0" },
        ]
    }
];

const SYNC_BACKUP_ARTICLES = [
    {
        section: "Data Management",
        items: [
            { id: "sync-devices", title: "Does Stride sync my data across devices?", time: "2 min", views: "14,200", rating: "4.8" },
            { id: "backup-data", title: "How do I backup my data?", time: "2 min", views: "16,500", rating: "4.9" },
            { id: "auto-sync-toggle", title: "What does the \"Auto Sync\" toggle do?", time: "1 min", views: "9,100", rating: "4.5" },
            { id: "transfer-data", title: "Can I transfer my data to a new phone?", time: "1 min", views: "11,800", rating: "4.4" },
        ]
    }
];

const MOBILE_APP_ARTICLES = [
    {
        section: "Getting Started",
        items: [
            { id: "platforms", title: "Supported Platforms and Devices", time: "1 min", views: "15,200", rating: "4.6" },
            { id: "install", title: "How to Download and Install Stride", time: "1 min", views: "22,100", rating: "4.9" },
        ]
    },
    {
        section: "Maintenance & Usage",
        items: [
            { id: "updating", title: "Updating the App", time: "2 min", views: "8,400", rating: "4.7" },
            { id: "offline-mobile", title: "Does Stride work offline?", time: "1 min", views: "10,500", rating: "4.9" },
            { id: "permissions", title: "App Permissions Explained", time: "3 min", views: "5,300", rating: "4.5" },
        ]
    }
];

const FEATURES_ARTICLES = [
    {
        section: "Task Management",
        items: [
            { id: "create-task", title: "How to Create a New Task", time: "2 min", views: "18,200", rating: "4.8" },
            { id: "task-details", title: "Adding Details (Subtasks & Attachments)", time: "2 min", views: "14,500", rating: "4.7" },
            { id: "templates", title: "Using Task Templates", time: "3 min", views: "9,800", rating: "4.9" },
            { id: "sorting-filtering", title: "Sorting and Filtering Tasks", time: "2 min", views: "7,600", rating: "4.6" },
        ]
    },
    {
        section: "Productivity Tools",
        items: [
            { id: "focus-mode", title: "Using Focus Mode", time: "3 min", views: "25,400", rating: "4.9" },
            { id: "weekly-progress", title: "Tracking Your Weekly Progress", time: "2 min", views: "11,200", rating: "4.8" },
        ]
    }
];

const TROUBLESHOOTING_ARTICLES = [
    {
        section: "Common Issues",
        items: [
            { id: "notifications-issue", title: "Notifications or Reminders are not ringing", time: "2 min", views: "18,900", rating: "4.7" },
            { id: "timer-stops", title: "My Focus Timer stops when I lock the screen", time: "2 min", views: "14,200", rating: "4.6" },
            { id: "data-recovery", title: "I lost all my tasks. Can I recover them?", time: "2 min", views: "25,400", rating: "4.8" },
        ]
    },
    {
        section: "Performance & System",
        items: [
            { id: "performance-issue", title: "The app is crashing or running slowly", time: "3 min", views: "8,600", rating: "4.5" },
            { id: "widgets-issue", title: "Widgets or Quick Add not appearing", time: "2 min", views: "6,100", rating: "4.4" },
        ]
    }
];

const BILLING_ARTICLES = [
    {
        section: "Pricing & Plans",
        items: [
            { id: "is-free", title: "Is Stride free to use?", time: "1 min", views: "32,100", rating: "4.9" },
            { id: "hidden-fees", title: "Are there any hidden fees or in-app purchases?", time: "1 min", views: "15,400", rating: "5.0" },
            { id: "future-pricing", title: "Will Stride charge money in the future?", time: "2 min", views: "28,700", rating: "4.8" },
        ]
    }
];

const API_DEV_ARTICLES = [
    {
        section: "Developer Resources",
        items: [
            { id: "public-api", title: "Is there a Stride API?", time: "1 min", views: "4,500", rating: "4.7" },
            { id: "contribute", title: "Can I contribute to Stride's development?", time: "1 min", views: "3,200", rating: "4.8" },
        ]
    }
];

type ContentBlock = 
    | { type: 'text'; content: string }
    | { type: 'header'; content: string }
    | { type: 'tip'; content: string }
    | { type: 'list'; items: string[] }
    | { type: 'image'; caption: string };

const getArticleContent = (id: string, title: string, section: string): ContentBlock[] => {
    switch (id) {
        // --- ACCOUNT & SETTINGS ---
        case 'signup-login':
            return [
                { type: 'text', content: "Getting started with Stride is easy. When you first open the app, you have three options to access your to-do lists:" },
                { type: 'header', content: "Google Sign-In (Recommended)" },
                { type: 'text', content: "Tap the **Google** button for a quick, secure sign-in using your existing Google account." },
                { type: 'header', content: "Email & Password" },
                { type: 'text', content: "If you prefer a traditional login, you can create a unique Stride account using your email address and a strong password." },
                { type: 'header', content: "Guest Mode" },
                { type: 'text', content: "Want to try Stride immediately? Select the Guest option and enter your name to start adding tasks right away. **Note:** Guest data is stored locally on your device." },
                { type: 'tip', content: "To log out at any time, navigate to the Account tab and scroll down to find the Log Out option." }
            ];
        case 'switching-data':
            return [
                { type: 'text', content: "Currently, Stride stores your tasks, lists, and trophies locally on your device, not in the cloud." },
                { type: 'header', content: "What this means for you" },
                { type: 'text', content: "If you log out of your current account (or Guest mode) and log into a different account on the same device, your previous tasks will **not** transfer over. The new account will start fresh." },
                { type: 'tip', content: "Please ensure you have completed important tasks before switching accounts or uninstalling the app, as local data cannot be recovered once lost." }
            ];
        case 'edit-profile':
            return [
                { type: 'text', content: "You can update how your name appears in the app from the Account section." },
                { type: 'list', items: [
                    "Tap the **Account** icon (the person icon) in the bottom navigation bar.",
                    "Tap the **Edit Profile** button located under your current name.",
                    "Enter your new desired name.",
                    "Save your changes."
                ]},
                { type: 'text', content: "Currently, only your display name can be edited." }
            ];
        case 'notifications':
            return [
                { type: 'text', content: "Stride can send you reminders for due tasks so you never miss a deadline. You have full control over these notifications." },
                { type: 'header', content: "To turn notifications ON or OFF" },
                { type: 'list', items: [
                    "Go to the **Account** tab.",
                    "Tap on **Settings**.",
                    "Find the **Notifications** toggle switch.",
                    "Turn toggle **ON** to receive task reminders.",
                    "Turn toggle **OFF** to disable all app notifications from Stride."
                ]}
            ];
        case 'battery-opt':
            return [
                { type: 'text', content: "In your **Account** menu, you will see an option for Battery Optimization." },
                { type: 'header', content: "Why is this important?" },
                { type: 'text', content: "Stride is designed to run efficiently in the background to ensure your reminders fire on time. Enabling this in-app feature helps Stride reduce unwanted battery usage on your device while still ensuring the app functions correctly." },
                { type: 'tip', content: "We recommend leaving this active for the best balance of performance and battery life." }
            ];
        case 'language':
            return [
                { type: 'text', content: "Stride is currently available in English." },
                { type: 'text', content: "You can view the current language setting by going to **Account > Settings > Language**." },
                { type: 'text', content: "We are working on adding support for more languages in future updates!" }
            ];
        case 'delete-account':
            return [
                { type: 'text', content: "If you wish to permanently remove your account and data from Stride:" },
                { type: 'list', items: [
                    "Navigate to the **Account** tab located in the bottom navigation bar.",
                    "Scroll down to the very bottom of the screen.",
                    "Tap the red **Delete Account** button.",
                    "Confirm that you wish to proceed."
                ]}
            ];
        case 'change-password':
            return [
                { type: 'text', content: "If you signed up using an email and password, you can update your credentials directly in the app." },
                { type: 'list', items: [
                    "Go to the **Account** tab.",
                    "Tap on the **Change Password** button (located below Edit Profile).",
                    "You will be prompted to enter your current password for security.",
                    "Enter your new password and confirm it."
                ]},
                { type: 'tip', content: "**Note:** This option is not available for users who sign in via Google or Guest mode, as those accounts do not use a Stride-specific password." }
            ];
        case 'appearance':
            return [
                { type: 'text', content: "Stride allows you to customize the look of the app to match your preference or your device's system settings." },
                { type: 'list', items: [
                    "Navigate to **Account > Settings**.",
                    "Tap on **Theme** under the Preferences section."
                ]},
                { type: 'header', content: "Options" },
                { type: 'list', items: [
                    "**Light:** Keeps the app in light mode at all times.",
                    "**Dark:** Keeps the app in dark mode, which is easier on the eyes in low light.",
                    "**Auto:** Automatically switches between Light and Dark mode based on your device’s global system settings."
                ]}
            ];
        case 'sound-haptics':
            return [
                { type: 'text', content: "You can control how Stride interacts with you while you use the app." },
                { type: 'header', content: "Haptic Feedback (Vibration)" },
                { type: 'text', content: "Haptic feedback provides a small vibration when you interact with certain elements, like completing a task. To enable or disable this, go to **Account** and toggle the **Haptic Feedback** switch ON or OFF." },
                { type: 'header', content: "Sound Effects" },
                { type: 'text', content: "Stride plays subtle sounds when you complete tasks or navigate the app. To manage this, go to **Account > Settings** and find the **Sound Effects** toggle. Turn it ON to hear app sounds, or OFF for a silent experience." }
            ];
        case 'stats-trophies':
            return [
                { type: 'text', content: "Stride gamifies your productivity to keep you motivated. On your Account screen, you will see a dashboard of your progress." },
                { type: 'header', content: "Your Stats" },
                { type: 'list', items: [
                    "**Tasks Created:** The total number of tasks you have added since joining.",
                    "**Days Streak:** The number of consecutive days you have used the app."
                ]},
                { type: 'header', content: "Trophies" },
                { type: 'text', content: "As you use the app, you unlock badges for your achievements. You can view your collection at the bottom of the Account screen:" },
                { type: 'list', items: [
                    "**Consistency:** Awarded for maintaining a daily streak.",
                    "**On Fire:** Awarded for high productivity periods.",
                    "**Unstoppable:** Awarded for completing a high volume of tasks.",
                    "**Speed Demon:** Awarded for completing tasks quickly after creating them."
                ]}
            ];

        // --- SYNC & BACKUP ---
        case 'sync-devices':
            return [
                { type: 'text', content: "Currently, Stride operates as an offline, local-first application." },
                { type: 'header', content: "What this means" },
                { type: 'text', content: "This means that your tasks, lists, and progress are stored strictly on the device you are currently using. We do not sync your data to the cloud or across multiple devices at this time." },
                { type: 'text', content: "For example: If you use Stride on your phone and then log in on a tablet or another phone, you will not see your tasks there. Each device has its own separate list of data." },
                { type: 'tip', content: "We are actively working on Cloud Sync for a future update, so stay tuned!" }
            ];
        case 'backup-data':
            return [
                { type: 'text', content: "Because Stride values privacy and simplicity, we do not store your data on external servers." },
                { type: 'header', content: "Important Data Safety Warning" },
                { type: 'text', content: "Your data exists only on your phone. Stride does not perform automatic cloud backups." },
                { type: 'list', items: [
                    "If you **uninstall the app**: All your tasks and history will be permanently deleted.",
                    "If you **clear the app data**: Your tasks will be erased.",
                    "If you **lose your phone**: Your data cannot be recovered by our support team."
                ]},
                { type: 'tip', content: "We recommend keeping the app installed to ensure your tasks remain safe." }
            ];
        case 'auto-sync-toggle':
            return [
                { type: 'text', content: "In your Settings menu, you may see a toggle switch labeled **Auto Sync**." },
                { type: 'header', content: "Is it working?" },
                { type: 'text', content: "This button is a placeholder for an upcoming feature. Currently, toggling it On or Off does not affect your data or app performance. It is there to prepare for our future Cloud Sync update, which will allow you to save your tasks online." },
                { type: 'tip', content: "For now, you can leave this setting as it is." }
            ];
        case 'transfer-data':
            return [
                { type: 'text', content: "At this time, there is no direct way to export or transfer your Stride database from one phone to another." },
                { type: 'header', content: "Moving Devices" },
                { type: 'text', content: "If you get a new device, you will need to start fresh with a new set of tasks. We suggest manually noting down any critical tasks from your old device before switching." }
            ];

        // --- MOBILE APP ---
        case 'platforms':
            return [
                { type: 'text', content: "Stride is currently designed exclusively for Android devices." },
                { type: 'header', content: "Requirements" },
                { type: 'text', content: "To ensure the best experience, we recommend using a device running Android 10 or higher. While the app may function on older versions, newer Android versions ensure better performance for notifications and background timers." },
                { type: 'tip', content: "Note: An iOS (iPhone) version is not available at this time." }
            ];
        case 'install':
             return [
                { type: 'text', content: "You can install Stride securely from the official store:" },
                { type: 'list', items: [
                    "Open the Google Play Store on your Android device.",
                    "Search for \"Stride To-Do\".",
                    "Tap the **Install** button.",
                    "Once installed, tap Open to launch the app and start organizing your life."
                ]}
             ];
        case 'updating':
             return [
                { type: 'text', content: "We frequently release updates to add new languages, fix bugs, and introduce new features (like the upcoming Cloud Sync)." },
                { type: 'header', content: "How to update" },
                { type: 'list', items: [
                    "Open the Google Play Store.",
                    "Tap your profile icon in the top right.",
                    "Select **Manage apps & device**.",
                    "Look for **Updates available**.",
                    "Find Stride in the list and tap **Update**."
                ]},
                { type: 'tip', content: "Tip: You can enable \"Auto-update\" in the Play Store settings to never miss a new version." }
             ];
        case 'offline-mobile':
            return [
                { type: 'text', content: "**Yes!** Stride is a \"local-first\" mobile app." },
                { type: 'text', content: "This means you do not need an active internet connection to:" },
                { type: 'list', items: [
                    "Create and edit tasks.",
                    "Use Focus Mode.",
                    "Access your templates.",
                    "View your history."
                ]},
                { type: 'text', content: "You can use Stride anywhere—on a flight, in a subway, or in areas with poor reception—without any interruption." }
            ];
        case 'permissions':
             return [
                { type: 'text', content: "When you install Stride, we may ask for certain permissions to ensure the app works correctly. Here is why we need them:" },
                { type: 'list', items: [
                    "**Notifications:** Required to send you reminders for your due tasks and Focus Mode alerts.",
                    "**Alarms & Reminders:** Required to ring accurately at the exact time you set a task.",
                    "**Battery Optimization (Ignore):** We may ask you to exclude Stride from battery saving modes. This prevents your phone from \"killing\" the app in the background, which would stop your reminders from working."
                ]}
             ];

        // --- FEATURES ---
        case 'focus-mode':
            return [
                { type: 'text', content: "Focus Mode is Stride's signature feature designed to eliminate distractions and help you enter a flow state." },
                { type: 'header', content: "How to use it" },
                { type: 'list', items: ["Tap on any task to open its details.", "Tap the large **Focus** button.", "The interface will darken, hiding all other tasks.", "A timer will start tracking your session."] },
                { type: 'tip', content: "Pro Tip: Enable 'Deep Focus' in settings to automatically trigger your phone's Do Not Disturb mode when the timer starts." }
            ];
        case 'create-task':
            return [
                { type: 'text', content: "Adding tasks in Stride is designed to be lightning fast." },
                { type: 'header', content: "Methods" },
                { type: 'list', items: ["**Quick Add:** Tap the (+) button in the bottom center.", "**Widget:** Use the home screen widget to add a task without opening the app.", "**Voice:** Long press the (+) button to use voice entry."] }
            ];
        
        // --- TROUBLESHOOTING ---
        case 'notifications-issue':
            return [
                { type: 'text', content: "If your reminders aren't ringing, your phone's battery optimization is likely putting Stride to sleep." },
                { type: 'header', content: "How to fix (Android)" },
                { type: 'list', items: ["Open your phone's **Settings** app.", "Go to **Apps** > **Stride** > **Battery**.", "Select **Unrestricted** or **No Restrictions**."] },
                { type: 'text', content: "Also, verify that you haven't enabled 'Do Not Disturb' mode on your device." }
            ];
        case 'widgets-issue':
            return [
                { type: 'text', content: "Widgets can sometimes freeze if the app is updated or if the system kills the background process." },
                { type: 'header', content: "Steps to resolve" },
                { type: 'list', items: ["Remove the widget from your home screen.", "Restart your device.", "Add the widget again."] },
                { type: 'tip', content: "If the issue persists, ensure Stride has 'Background Activity' permissions enabled in your device settings." }
            ];
        case 'data-recovery':
            return [
                { type: 'text', content: "Because Stride does not sync to the cloud, we cannot recover data remotely if it is lost from your device." },
                { type: 'header', content: "Check for Local Backups" },
                { type: 'text', content: "If you have previously used the 'Export Data' feature, search your file manager for `.stride` files. You can import these to restore your state." }
            ];

        // --- BILLING ---
        case 'is-free':
            return [
                { type: 'text', content: "**Yes.** Stride is completely free to download and use." },
                { type: 'text', content: "We believe basic productivity tools should be accessible to everyone." }
            ];
        case 'future-pricing':
            return [
                { type: 'text', content: "We plan to introduce a 'Stride Pro' tier in the future for advanced features like Team Collaboration and Cloud Sync." },
                { type: 'text', content: "However, all current local features (Tasks, Focus Mode, Stats) will remain free forever." }
            ];

        // --- API ---
        case 'public-api':
            return [
                { type: 'text', content: "Currently, Stride does not offer a public API for third-party developers." },
                { type: 'header', content: "Why?" },
                { type: 'text', content: "Because the app operates as a standalone, local-first utility, there are no external endpoints available to connect with other services (like Zapier or IFTTT) at this time." }
            ];

        // --- FALLBACK ---
        default:
            return [
                { type: 'text', content: `Guide for **${title}**.` },
                { type: 'header', content: "Overview" },
                { type: 'text', content: `This feature helps you manage your ${section.toLowerCase()}. Customizing it allows Stride to adapt to your personal workflow.` },
                { type: 'header', content: "Instructions" },
                { type: 'list', items: [
                    "Open the Stride application.",
                    "Navigate to **Settings**.",
                    `Locate the **${title}** option.`,
                    "Configure as needed."
                ]},
                { type: 'tip', content: "If you cannot find this setting, please ensure you have updated to the latest version of Stride." }
            ];
    }
};

const generateKnowledgeBase = () => {
    let kb = "Current Date: " + new Date().toDateString() + "\n\n";
    kb += "Here is the knowledge base for Stride support. Use this to answer user questions accurately.\n\n";
    kb += "=== FREQUENTLY ASKED QUESTIONS ===\n";
    ALL_FAQS.forEach(category => {
       kb += `\n[${category.category}]\n`;
       category.items.forEach(item => {
           kb += `Q: ${item.q}\nA: ${item.a}\n`;
       });
    });
    return kb;
};

// --- HELPER COMPONENTS (Defined ONCE) ---

const SearchInterface = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mb-20 relative z-20">
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform -translate-y-2' : ''}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="How can we help you today?"
          className="w-full bg-white border border-gray-200 rounded-2xl py-6 pl-16 pr-6 text-lg shadow-sm hover:shadow-md focus:shadow-xl focus:border-black focus:outline-none transition-all"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
      </div>

      <AnimatePresence>
        {(isFocused || query.length > 0) ? (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
                {query.length > 0 ? (
                    <div>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                            <Zap size={16} className="text-yellow-500" />
                            <span>Instant Answers</span>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <h4 className="font-bold text-blue-900 text-sm mb-1">Results for "{query}"</h4>
                                <p className="text-blue-700 text-sm">We found 3 articles and 1 video that might help.</p>
                            </div>
                            {['Troubleshooting Sync Issues', 'Account Recovery Guide', 'Setting up Widgets'].map((item, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText size={16} className="text-gray-400" />
                                        <span className="text-gray-700 group-hover:text-black transition-colors">{item}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-black" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Suggested Topics</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Sync Issues', 'Billing', 'Feature Request', 'Bug Report', 'Account'].map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
                <button className="text-sm font-bold text-blue-600 hover:underline">View all results</button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const HubSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="mb-20">
    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        {title}
        <div className="h-px bg-gray-200 flex-1 ml-4"></div>
    </h2>
    {children}
  </div>
);

// --- ARTICLE VIEW ---
const ArticleView: React.FC<{ 
    article: { id: string, title: string, section: string, time: string, views: string, rating: string }, 
    onBack: () => void,
    onSelectArticle?: (article: any) => void
}> = ({ article, onBack, onSelectArticle }) => {
    const content = getArticleContent(article.id, article.title, article.section);
    
    useEffect(() => {
        window.scrollTo(0,0);
    }, [article]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="min-h-screen bg-white pb-32"
        >
            <div className="bg-white border-b border-gray-200 pt-32 pb-8 px-6 sticky top-0 z-30 bg-opacity-95 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={onBack}
                        className="group flex items-center gap-3 text-gray-500 hover:text-black transition-colors mb-8"
                    >
                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <span className="font-bold text-sm">Back</span>
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <button onClick={onBack} className="hover:text-black transition-colors">Support Hub</button>
                        <ChevronRight size={14} />
                        <span>{article.section}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">{article.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2"><Clock size={16} /> {article.time} read</span>
                        <span className="flex items-center gap-2"><Eye size={16} /> {article.views} views</span>
                        <span className="flex items-center gap-2"><Star size={16} className="text-yellow-500 fill-current" /> {article.rating}/5</span>
                        <span className="text-gray-300">|</span>
                        <span>Updated Dec 18, 2024</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    <div className="prose prose-lg prose-slate max-w-none">
                        {content.map((block, i) => {
                            if (block.type === 'header') return <h3 key={i} className="text-2xl font-bold text-gray-900 mt-12 mb-6">{block.content}</h3>;
                            if (block.type === 'text') return <p key={i} className="text-gray-600 leading-relaxed mb-6">{block.content}</p>;
                            if (block.type === 'list') return (
                                <ul key={i} className="space-y-3 mb-8">
                                    {block.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3 text-gray-700">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                        </li>
                                    ))}
                                </ul>
                            );
                            if (block.type === 'tip') return (
                                <div key={i} className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8">
                                    <div className="flex items-start gap-4">
                                        <Zap className="text-blue-600 shrink-0 mt-1" size={20} />
                                        <div className="text-blue-900 text-sm leading-relaxed">
                                            <span dangerouslySetInnerHTML={{ __html: block.content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                        </div>
                                    </div>
                                </div>
                            );
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const GenericTopicView: React.FC<{ 
    title: string; 
    subtitle: string; 
    icon: React.ReactNode; 
    colorClass: string; 
    sections: { section: string; items: any[] }[]; 
    onBack: () => void; 
}> = ({ title, subtitle, icon, colorClass, sections, onBack }) => {
    const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (selectedArticle) {
        return (
            <ArticleView 
                article={selectedArticle} 
                onBack={() => setSelectedArticle(null)} 
                onSelectArticle={setSelectedArticle} 
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="min-h-screen bg-gray-50 pb-32"
        >
            <div className="bg-white border-b border-gray-200 pt-32 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={onBack}
                        className="group flex items-center gap-3 text-gray-500 hover:text-black transition-colors mb-8"
                    >
                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <span className="font-bold text-sm">Back to Hub</span>
                    </button>

                    <div className="flex items-start gap-6">
                        <div className={`p-4 rounded-2xl ${colorClass}`}>
                            {icon}
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
                            <p className="text-xl text-gray-500">{subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
                {sections.map((section, i) => (
                    <div key={i}>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            {section.section}
                            <div className="h-px bg-gray-200 flex-1"></div>
                        </h2>
                        <div className="grid gap-4">
                            {section.items.map((item, j) => (
                                <div 
                                    key={j}
                                    onClick={() => setSelectedArticle({ ...item, section: section.section })}
                                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all group"
                                >
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mb-2 transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {item.time}</span>
                                        <span className="flex items-center gap-1"><Eye size={14} /> {item.views}</span>
                                        <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-current" /> {item.rating}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

// Topic wrappers 
const AccountSettingsTopic: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <GenericTopicView title="Account & Settings" subtitle="Manage your profile, preferences, and notifications." icon={<Settings size={32} />} colorClass="bg-gray-100 text-gray-600" sections={ACCOUNT_ARTICLES} onBack={onBack} />
);
const SyncBackupTopic: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <GenericTopicView title="Sync & Backup" subtitle="Data management, export, and device transfer." icon={<Cloud size={32} />} colorClass="bg-blue-50 text-blue-600" sections={SYNC_BACKUP_ARTICLES} onBack={onBack} />
);
const MobileAppTopic: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <GenericTopicView title="Mobile App" subtitle="Installation, updates, and platform specific guides." icon={<Smartphone size={32} />} colorClass="bg-purple-50 text-purple-600" sections={MOBILE_APP_ARTICLES} onBack={onBack} />
);
const FeaturesTopic: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <GenericTopicView title="Features" subtitle="Master Stride's tools: Focus Mode, Templates, and more." icon={<Layout size={32} />} colorClass="bg-orange-50 text-orange-600" sections={FEATURES_ARTICLES} onBack={onBack} />
);
const TroubleshootingTopic: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <GenericTopicView title="Troubleshooting" subtitle="Fix common issues with notifications, widgets, and more." icon={<LifeBuoy size={32} />} colorClass="bg-red-50 text-red-600" sections={TROUBLESHOOTING_ARTICLES} onBack={onBack} />
);
const BillingTopic: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <GenericTopicView title="Billing & Pricing" subtitle="Information about free features and future plans." icon={<CreditCard size={32} />} colorClass="bg-green-50 text-green-600" sections={BILLING_ARTICLES} onBack={onBack} />
);
const ApiDevTopic: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <GenericTopicView title="API & Dev" subtitle="Integration status and developer contributions." icon={<Code size={32} />} colorClass="bg-gray-800 text-gray-200" sections={API_DEV_ARTICLES} onBack={onBack} />
);

// --- TYPES FOR CHAT WIDGET ---
type MessageType = 'ai' | 'user' | 'system' | 'agent';
interface ChatMessage {
    id: string;
    type: MessageType;
    text: string;
    timestamp: Date;
    quickActions?: string[];
    card?: {
        type: 'article' | 'video';
        title: string;
        desc: string;
        link?: string;
    };
    agentName?: string;
    isTyping?: boolean;
    attachment?: string;
}

// --- CHAT WIDGET COMPONENT ---
const SupportChatWidget = ({ isOpen, onToggle }: { isOpen: boolean, onToggle: (open: boolean) => void }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const knowledgeBase = useMemo(() => generateKnowledgeBase(), []);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Initial Greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                { 
                    id: 'init-1', 
                    type: 'system', 
                    text: 'Chat Started', 
                    timestamp: new Date() 
                },
                { 
                    id: 'init-2', 
                    type: 'ai', 
                    text: "👋 Hi! I'm Stride AI. I'm here to help you with Stride. What can I help you with today?", 
                    timestamp: new Date(),
                    quickActions: ['Sync Issues', 'Widget Help', 'Account Help', 'Something Else']
                }
            ]);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (textOverride?: string) => {
        const userText = textOverride || input;
        if (!userText.trim() && !attachment) return;

        setInput('');
        setAttachment(null);
        setShowEmojiPicker(false);

        const newMsg: ChatMessage = { 
            id: Date.now().toString(), 
            type: 'user', 
            text: userText, 
            timestamp: new Date(),
            attachment: attachment ? attachment.name : undefined
        };
        setMessages(prev => [...prev, newMsg]);
        setIsTyping(true);

        // Simulated AI response
        setTimeout(async () => {
            const historyForGemini = messages
                .filter(m => m.type === 'user' || m.type === 'ai')
                .map(m => ({ role: m.type === 'user' ? 'user' as const : 'model' as const, text: m.text }));

            const systemInstruction = `You are a helpful customer support AI for Stride. 
            Your goal is to answer user questions using the provided Knowledge Base below.
            If the answer is found in the Knowledge Base, summarize it clearly.
            If the answer is NOT in the Knowledge Base, politely say you don't have that information and suggest contacting human support.
            
            ${knowledgeBase}`;

            const response = await chatWithAssistant(historyForGemini, userText, systemInstruction);
            
            setIsTyping(false);
            setMessages(prev => [...prev, { 
                id: Date.now().toString(), 
                type: 'ai', 
                text: response || "I'm having trouble connecting to the server.", 
                timestamp: new Date() 
            }]);
        }, 1000);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleEmojiClick = (emoji: string) => {
        setInput(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen ? (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => onToggle(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
                    >
                        <MessageCircle size={32} className="text-white" />
                        <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        <div className="absolute right-20 bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            <div className="font-bold text-gray-900">Chat with us 💬</div>
                            <div className="text-xs text-green-600 font-medium">We're online 🟢</div>
                        </div>
                    </motion.button>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[380px] h-[100dvh] md:h-[600px] bg-white md:rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
                                <div>
                                    <h3 className="font-bold text-sm text-gray-900">Stride Support</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <span className="text-[10px] text-gray-500 font-medium">Online • Replies in 2m</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <button onClick={() => onToggle(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Minus size={18} />
                                </button>
                                <button onClick={() => onToggle(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-6">
                            {messages.map((msg) => (
                                <div key={msg.id} className="space-y-1">
                                    {msg.type === 'system' && (
                                        <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest py-4 border-b border-gray-100 mb-4 mx-8">
                                            {msg.text}
                                        </div>
                                    )}
                                    {msg.type === 'ai' && (
                                        <div className="flex items-end gap-2">
                                            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold mb-4 shrink-0">AI</div>
                                            <div className="space-y-2 max-w-[85%]">
                                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none text-sm text-gray-800 shadow-sm">
                                                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                                                </div>
                                                <div className="text-[10px] text-gray-400 pl-1">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {msg.type === 'user' && (
                                        <div className="flex justify-end">
                                            <div className="max-w-[85%] space-y-1">
                                                <div className="bg-black text-white p-3 rounded-2xl rounded-br-none text-sm shadow-md">
                                                    {msg.attachment && (
                                                        <div className="flex items-center gap-2 mb-2 bg-white/20 p-2 rounded-lg text-xs">
                                                            <Paperclip size={12} /> {msg.attachment}
                                                        </div>
                                                    )}
                                                    {msg.text}
                                                </div>
                                                <div className="text-[10px] text-gray-400 text-right pr-1">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {msg.quickActions && (
                                        <div className="flex flex-wrap gap-2 pl-8">
                                            {msg.quickActions.map((action, i) => (
                                                <button key={i} onClick={() => handleSend(action)} className="px-3 py-1.5 bg-white border border-gray-200 hover:border-black text-gray-700 hover:text-black rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95">
                                                    {action}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-end gap-2">
                                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold mb-1 shrink-0">AI</div>
                                    <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Footer */}
                        <div className="bg-white p-4 border-t border-gray-100 relative">
                            <AnimatePresence>
                                {showEmojiPicker ? (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-4 bg-white border border-gray-200 shadow-xl rounded-xl p-2 grid grid-cols-6 gap-2 mb-2 z-20">
                                        {['😀','😂','😍','🤔','👍','👎','🔥','❤️','🎉','🚀','💻','🐛'].map(emoji => (
                                            <button key={emoji} onClick={() => handleEmojiClick(emoji)} className="hover:bg-gray-100 p-1 rounded text-lg">{emoji}</button>
                                        ))}
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                            {attachment && (
                                <div className="absolute bottom-full left-0 right-0 bg-gray-50 border-t border-gray-200 p-2 flex items-center gap-2 text-xs text-gray-600 px-4">
                                    <Paperclip size={12} /> <span className="truncate flex-1">{attachment.name}</span> <button onClick={() => setAttachment(null)} className="hover:text-red-500"><X size={12} /></button>
                                </div>
                            )}
                            <div className="relative">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your message..." className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-24 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                                    <button onClick={() => fileInputRef.current?.click()} className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors" title="Attach File"><Paperclip size={16} /></button>
                                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors" title="Add Emoji"><Smile size={16} /></button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                                <div className="flex gap-2">
                                    <button className="p-2 bg-gray-50 text-gray-500 hover:text-black rounded-lg transition-colors"><ImageIcon size={16} /></button>
                                    <button className="p-2 bg-gray-50 text-gray-500 hover:text-black rounded-lg transition-colors"><Mic size={16} /></button>
                                </div>
                                <button onClick={() => handleSend()} disabled={!input.trim() && !attachment} className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                    Send <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.div>
    );
};

// --- TOPIC CARD ---
const TopicCard = ({ title, icon, desc, onClick }: { title: string, icon: any, desc: string, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="text-left p-6 bg-white border border-gray-200 rounded-2xl hover:border-black hover:shadow-lg transition-all group"
    >
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-1 flex items-center justify-between">
            {title}
            <ChevronRight size={16} className="text-gray-300 group-hover:text-black transform group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-sm text-gray-500">{desc}</p>
    </button>
);

// --- SUPPORT HUB ---
const SupportHub: React.FC<{ product: Product; onBack: () => void }> = ({ product, onBack }) => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);

    if (selectedTopic === 'account') return <AccountSettingsTopic onBack={() => setSelectedTopic(null)} />;
    if (selectedTopic === 'sync') return <SyncBackupTopic onBack={() => setSelectedTopic(null)} />;
    if (selectedTopic === 'mobile') return <MobileAppTopic onBack={() => setSelectedTopic(null)} />;
    if (selectedTopic === 'features') return <FeaturesTopic onBack={() => setSelectedTopic(null)} />;
    if (selectedTopic === 'troubleshooting') return <TroubleshootingTopic onBack={() => setSelectedTopic(null)} />;
    if (selectedTopic === 'billing') return <BillingTopic onBack={() => setSelectedTopic(null)} />;
    if (selectedTopic === 'api') return <ApiDevTopic onBack={() => setSelectedTopic(null)} />;

    return (
        <div className="min-h-screen bg-white">
             {/* Email Form Modal */}
            <AnimatePresence>
                {isEmailFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEmailFormOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }} 
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            <EmailSupportForm onClose={() => setIsEmailFormOpen(false)} initialProduct={product.id} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header / Hero */}
            <div className="bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/20">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Systems Operational
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">How can we help?</h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Search our knowledge base or browse help topics below.
                    </p>
                    <SearchInterface />
                </div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <HubSection title="Browse by Topic">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TopicCard 
                            title="Account & Settings" 
                            icon={<Settings size={24}/>} 
                            desc="Manage profile, preferences, and notifications." 
                            onClick={() => setSelectedTopic('account')}
                        />
                        <TopicCard 
                            title="Sync & Backup" 
                            icon={<Cloud size={24}/>} 
                            desc="Data safety, export, and device transfer." 
                            onClick={() => setSelectedTopic('sync')}
                        />
                        <TopicCard 
                            title="Mobile App" 
                            icon={<Smartphone size={24}/>} 
                            desc="Installation, updates, and compatibility." 
                            onClick={() => setSelectedTopic('mobile')}
                        />
                        <TopicCard 
                            title="Features" 
                            icon={<Layout size={24}/>} 
                            desc="Focus Mode, Templates, and Task tools." 
                            onClick={() => setSelectedTopic('features')}
                        />
                        <TopicCard 
                            title="Troubleshooting" 
                            icon={<LifeBuoy size={24}/>} 
                            desc="Fix common issues and bugs." 
                            onClick={() => setSelectedTopic('troubleshooting')}
                        />
                        <TopicCard 
                            title="Billing & Pricing" 
                            icon={<CreditCard size={24}/>} 
                            desc="Free plan details and future pricing." 
                            onClick={() => setSelectedTopic('billing')}
                        />
                        <TopicCard 
                            title="API & Developers" 
                            icon={<Code size={24}/>} 
                            desc="Integration status and contribution." 
                            onClick={() => setSelectedTopic('api')}
                        />
                    </div>
                </HubSection>

                <HubSection title="Common Questions">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {POPULAR_FAQS.map((faq, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                                    <HelpCircle size={18} className="text-gray-400 mt-1 shrink-0" />
                                    {faq.q}
                                </h3>
                                <p className="text-gray-600 text-sm pl-7">{faq.a}</p>
                            </div>
                        ))}
                     </div>
                </HubSection>

                <div className="mt-20 p-8 md:p-12 bg-gray-900 rounded-3xl text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                        <p className="text-gray-400 mb-8">Our support team is just a message away.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                             <button onClick={() => setIsChatOpen(true)} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                <MessageCircle size={18} /> Chat with AI
                             </button>
                             <button onClick={() => setIsEmailFormOpen(true)} className="bg-transparent border border-gray-700 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                <Mail size={18} /> Email Support
                             </button>
                        </div>
                    </div>
                </div>
            </div>

            <SupportChatWidget isOpen={isChatOpen} onToggle={setIsChatOpen} />
        </div>
    );
};

const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <SupportHub product={STRIDE_PRODUCT} onBack={() => onNavigate?.('home')} />;
};

export default SupportPage;