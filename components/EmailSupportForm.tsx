import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, Paperclip, ChevronDown, Monitor, Info, 
  Trash2, Image as ImageIcon, FileText, Check, AlertCircle,
  Smartphone, Laptop, Globe, HelpCircle, Clock, Hash
} from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
    { id: 'stride', name: 'Stride', icon: <div className="w-5 h-5 bg-black text-white rounded flex items-center justify-center font-bold text-[10px]">S</div> },
    { id: 'phoenix', name: 'Phoenix', icon: <div className="w-5 h-5 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-[10px]">P</div> },
    { id: 'atlas', name: 'Atlas', icon: <div className="w-5 h-5 bg-purple-600 text-white rounded flex items-center justify-center font-bold text-[10px]">A</div> },
];

const ISSUE_TYPES = [
    { category: "Common Issues", items: [
        { id: 'sync', label: 'Sync Problems', priority: 'high' },
        { id: 'notification', label: 'Notification Issues', priority: 'medium' },
        { id: 'widget', label: 'Widget Not Working', priority: 'medium' },
    ]},
    { category: "Account & Settings", items: [
        { id: 'access', label: 'Account Access', priority: 'critical' },
        { id: 'password', label: 'Password Reset', priority: 'high' },
        { id: 'billing', label: 'Billing Question', priority: 'medium' },
    ]},
    { category: "Technical", items: [
        { id: 'crash', label: 'App Crashing', priority: 'high' },
        { id: 'data', label: 'Data Loss', priority: 'critical' },
        { id: 'perf', label: 'Performance Issue', priority: 'medium' },
    ]},
    { category: "Other", items: [
        { id: 'feature', label: 'Feature Request', priority: 'low' },
        { id: 'feedback', label: 'General Feedback', priority: 'low' },
    ]}
];

interface EmailSupportFormProps {
    onClose: () => void;
    initialProduct?: string;
}

const EmailSupportForm: React.FC<EmailSupportFormProps> = ({ onClose, initialProduct = 'stride' }) => {
    const [selectedProduct, setSelectedProduct] = useState<string>(initialProduct);
    const [selectedIssue, setSelectedIssue] = useState<string>('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [files, setFiles] = useState<File[]>([]);
    const [deviceInfoEditing, setDeviceInfoEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Device Info State
    const [browserInfo, setBrowserInfo] = useState('Detecting...');
    const [osInfo, setOsInfo] = useState('Detecting...');
    const [deviceModel, setDeviceModel] = useState('Detecting...');
    const [appVersion, setAppVersion] = useState('Web Client v2.4.0');

    // Auto-detect device info on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const detectSystem = () => {
            const ua = navigator.userAgent;
            const width = window.screen.width;
            const height = window.screen.height;
            
            // 1. Detect Browser
            let browser = "Unknown Browser";
            // @ts-ignore - navigator.userAgentData is a newer API
            if (navigator.userAgentData && navigator.userAgentData.brands) {
                // @ts-ignore
                const brands = navigator.userAgentData.brands;
                // Filter out generic brands like "Not A;Brand"
                const brand = brands.find((b: any) => !b.brand.includes("Not") && b.brand !== "Chromium");
                if (brand) browser = `${brand.brand} ${brand.version}`;
            } 
            
            // Fallback to regex for browser
            if (browser === "Unknown Browser") {
                if (ua.match(/chrome|chromium|crios/i)) browser = "Chrome";
                else if (ua.match(/firefox|fxios/i)) browser = "Firefox";
                else if (ua.match(/safari/i)) browser = "Safari";
                else if (ua.match(/opr\//i)) browser = "Opera";
                else if (ua.match(/edg/i)) browser = "Edge";
            }

            // 2. Detect OS
            let os = "Unknown OS";
            // @ts-ignore
            if (navigator.userAgentData && navigator.userAgentData.platform) {
                // @ts-ignore
                os = navigator.userAgentData.platform;
            } else {
                if (ua.match(/Win/i)) os = "Windows";
                else if (ua.match(/Mac/i)) os = "macOS";
                else if (ua.match(/Linux/i)) os = "Linux";
                else if (ua.match(/Android/i)) os = "Android";
                else if (ua.match(/iPhone|iPad|iPod/i)) os = "iOS";
            }

            // 3. Detect Device Type / Model
            let device = "Desktop PC";
            if (ua.match(/Mobi/i) || ua.match(/Android/i) || ua.match(/iPhone/i)) {
                if (ua.match(/iPad/i)) device = "Tablet (iPad)";
                else if (ua.match(/iPhone/i)) device = "iPhone";
                else if (ua.match(/Android/i)) {
                    // Try to extract Android model
                    const match = ua.match(/\((.*?)\)/);
                    if (match && match[1]) {
                        const parts = match[1].split(';');
                        // Usually the model is the last or second to last part of the first parenthesis group in UA
                        const model = parts.find(p => p.includes("Build"))?.replace("Build", "").trim();
                        device = model || "Android Device";
                    } else {
                        device = "Android Device";
                    }
                } else {
                    device = "Mobile Device";
                }
            } else {
                // Check for MacOS specifically (often desktop)
                if (os === "macOS") {
                    // Rudimentary check for touch on desktop (rare but possible on some devices or hybrid)
                    device = "Mac";
                } else if (os === "Windows") {
                    device = "Windows PC";
                }
            }

            // Add Resolution
            device += ` (${width}x${height})`;

            setBrowserInfo(browser);
            setOsInfo(os);
            setDeviceModel(device);
        };

        detectSystem();
    }, []);

    // Auto-priority logic based on issue type
    useEffect(() => {
        const found = ISSUE_TYPES.flatMap(c => c.items).find(i => i.id === selectedIssue);
        if (found) setPriority(found.priority);
    }, [selectedIssue]);

    // Smart Subject Suggestions
    const getSuggestions = () => {
        if (!selectedIssue) return [];
        if (selectedIssue === 'sync') return ["Tasks not syncing between devices", "Sync stuck on 'Connecting'", "Data missing after update"];
        if (selectedIssue === 'crash') return ["App crashes on launch", "Crash when adding photo", "Freezes on loading screen"];
        if (selectedIssue === 'access') return ["Cannot log in", "Forgot password email not received"];
        return [];
    };

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files);
            // Simple validation: max 5 files
            setFiles(prev => [...prev, ...newFiles].slice(0, 5));
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files)].slice(0, 5));
        }
    };

    const validateEmail = (val: string) => {
        setEmail(val);
        if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = () => {
        if (!email || !description || emailError) return;
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl md:rounded-3xl"
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Check size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 mb-8 max-w-sm">We've received your ticket. Expect a response from our team within 4 hours.</p>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-8 w-full max-w-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Ticket ID</span>
                        <span className="font-mono font-bold text-gray-900">#STR-{Math.floor(Math.random()*10000)}</span>
                    </div>
                    <div className="text-left space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between"><span>Subject:</span> <span className="font-medium text-gray-900 truncate max-w-[150px]">{subject || 'Support Request'}</span></div>
                        <div className="flex justify-between"><span>Priority:</span> <span className="font-medium uppercase text-gray-900">{priority}</span></div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={onClose} className="text-gray-500 font-bold hover:text-black transition-colors px-6 py-3">
                        Close
                    </button>
                    <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg">
                        Track Ticket
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white md:rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-20">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-gray-900">
                        📧 Email Support
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-[10px] md:text-xs font-medium text-green-700">
                            <Clock size={12} />
                            <span>Reply time: ~2 hours</span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-black">
                    <X size={20} />
                </button>
            </div>

            {/* Form Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                
                {/* 1. Product & Issue Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Which product?</label>
                        <div className="relative">
                            <select 
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3.5 pr-10 focus:ring-2 focus:ring-black focus:border-transparent outline-none font-medium transition-shadow hover:border-gray-300 text-sm"
                            >
                                {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                                {PRODUCTS.find(p => p.id === selectedProduct)?.icon}
                                <ChevronDown className="text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Issue Type</label>
                        <div className="relative">
                            <select 
                                value={selectedIssue}
                                onChange={(e) => setSelectedIssue(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3.5 pr-10 focus:ring-2 focus:ring-black focus:border-transparent outline-none font-medium transition-shadow hover:border-gray-300 text-sm"
                            >
                                <option value="">Select issue...</option>
                                {ISSUE_TYPES.map(cat => (
                                    <optgroup key={cat.category} label={cat.category}>
                                        {cat.items.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
                                    </optgroup>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                {/* 2. Subject */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Subject <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none font-medium transition-shadow text-sm placeholder:text-gray-400"
                        placeholder="Brief description of your issue"
                    />
                    <div className="flex justify-between items-start">
                        <div className="flex gap-2 flex-wrap">
                            {getSuggestions().length > 0 && !subject && (
                                <AnimatePresence>
                                    {getSuggestions().map((s, i) => (
                                        <motion.button 
                                            key={s} 
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => setSubject(s)} 
                                            className="text-[10px] md:text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors border border-blue-100"
                                        >
                                            {s}
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0 ml-2">{subject.length}/150</span>
                    </div>
                </div>

                {/* 3. Contact Info (Email & Mobile) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => validateEmail(e.target.value)}
                                className={`w-full bg-white border ${emailError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-black'} rounded-xl px-4 py-3.5 focus:ring-2 focus:border-transparent outline-none transition-shadow text-sm`}
                                placeholder="name@example.com"
                            />
                            {email && !emailError && (
                                <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={16} />
                            )}
                        </div>
                        {emailError && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {emailError}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Mobile Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input 
                            type="tel" 
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-shadow text-sm"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                </div>

                {/* 4. Description */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-sm font-bold text-gray-700">Details <span className="text-red-500">*</span></label>
                    </div>
                    <div className="relative">
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl p-4 h-32 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-shadow resize-none text-sm leading-relaxed"
                            placeholder="Please include steps to reproduce the issue..."
                        />
                        <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 bg-white/80 backdrop-blur px-1 rounded">
                            {description.length}/2000
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Info size={12} /> Tip: More details = faster resolution
                    </p>
                </div>

                {/* 5. Attachments */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Attachments</label>
                    <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                        className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer group relative"
                    >
                        <input 
                            type="file" 
                            multiple 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileSelect}
                        />
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                            <Paperclip className="text-gray-400 group-hover:text-black" size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-600 block">Drop files here or click</span>
                        <span className="text-xs text-gray-400 mt-1 block">Max 10MB per file • Images, Video, Logs</span>
                    </div>
                    
                    <AnimatePresence>
                        {files.length > 0 && (
                            <div className="grid grid-cols-1 gap-2 mt-3">
                                {files.map((f, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100"
                                    >
                                        <div className="p-2 bg-white rounded border border-gray-200 text-blue-600">
                                            {f.type.startsWith('image') ? <ImageIcon size={14} /> : <FileText size={14} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-gray-700 truncate">{f.name}</div>
                                            <div className="text-[10px] text-gray-400">{(f.size / 1024 / 1024).toFixed(2)} MB</div>
                                        </div>
                                        <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 6. Device Info */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wide">
                            <Monitor size={14} /> Device Information
                        </div>
                        <button onClick={() => setDeviceInfoEditing(!deviceInfoEditing)} className="text-[10px] font-bold text-blue-600 hover:underline bg-white px-2 py-1 rounded border border-blue-100">
                            {deviceInfoEditing ? 'Save Details' : 'Edit'}
                        </button>
                    </div>
                    
                    {deviceInfoEditing ? (
                        <div className="grid grid-cols-2 gap-2">
                            <input 
                                className="p-2 border border-blue-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                value={browserInfo} 
                                onChange={(e) => setBrowserInfo(e.target.value)}
                                placeholder="Browser" 
                            />
                            <input 
                                className="p-2 border border-blue-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                value={osInfo} 
                                onChange={(e) => setOsInfo(e.target.value)}
                                placeholder="OS" 
                            />
                            <input 
                                className="p-2 border border-blue-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                value={appVersion}
                                onChange={(e) => setAppVersion(e.target.value)} 
                                placeholder="App Version" 
                            />
                            <input 
                                className="p-2 border border-blue-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                value={deviceModel}
                                onChange={(e) => setDeviceModel(e.target.value)} 
                                placeholder="Device Model" 
                            />
                        </div>
                    ) : (
                        <div className="text-xs text-blue-900/70 grid grid-cols-2 gap-y-1 font-mono">
                            <span className="flex items-center gap-1"><Globe size={10}/> {browserInfo}</span>
                            <span className="flex items-center gap-1"><Laptop size={10}/> {osInfo}</span>
                            <span className="flex items-center gap-1"><Hash size={10}/> {appVersion}</span>
                            <span className="flex items-center gap-1"><Smartphone size={10}/> {deviceModel}</span>
                        </div>
                    )}
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-blue-400">
                        <Check size={10} /> Auto-detected
                    </div>
                </div>

                {/* 7. Priority */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Priority Level</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { id: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-200' },
                            { id: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                            { id: 'high', label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                            { id: 'critical', label: 'Critical', color: 'bg-red-100 text-red-700 border-red-200' },
                        ].map((p) => (
                            <button 
                                key={p.id}
                                onClick={() => setPriority(p.id)}
                                className={`
                                    px-3 py-2.5 rounded-lg border text-xs font-bold transition-all relative overflow-hidden
                                    ${priority === p.id ? p.color + ' ring-1 ring-offset-1 ring-black/10' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}
                                `}
                            >
                                {priority === p.id && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="copy" defaultChecked className="rounded border-gray-300 text-black focus:ring-black" />
                    <label htmlFor="copy" className="text-xs text-gray-600 cursor-pointer select-none">Send me a copy of this email</label>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between sticky bottom-0 bg-white pb-2">
                    <button onClick={onClose} className="text-gray-500 text-sm font-bold hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting || !email || !description || !!emailError}
                        className={`
                            flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl font-bold text-sm transition-all
                            ${(isSubmitting || !email || !description || !!emailError) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-lg shadow-black/20'}
                        `}
                    >
                        {isSubmitting ? 'Sending...' : <>Send Email <ArrowRight size={16} /></>}
                    </button>
                </div>
                
                <div className="text-center">
                    <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                        <HelpCircle size={10} /> Your information is encrypted and secure.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Helper Icon for Send button
const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

export default EmailSupportForm;