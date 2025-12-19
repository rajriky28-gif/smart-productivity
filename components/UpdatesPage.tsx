import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  GitCommit, ArrowRight, Zap, Bug, Sparkles, Box, Smartphone, 
  Battery, Search, Calendar, ChevronDown, ChevronRight, Star, 
  MessageCircle, Download, Shield, RefreshCw, Layout, Eye,
  Award, Heart, Coffee, Globe, Check, Users
} from 'lucide-react';

// --- SHARED UTILITIES ---

const NumberTicker = ({ value }: { value: number }) => {
    return <span>{value.toLocaleString()}</span>;
};

// --- SECTION 1: THE UPDATE RIVER (Entrance) ---

const UpdateRiver = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Generate random commit particles
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        color: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'][Math.floor(Math.random() * 4)] // Green, Blue, Yellow, Purple
    }));

    return (
        <section className="relative h-screen bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
            {/* Starfield Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]"></div>
            
            {/* The River Flow */}
            <div className="absolute inset-0 z-0">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
                        transition={{ 
                            duration: p.duration, 
                            repeat: Infinity, 
                            delay: p.delay,
                            ease: "linear"
                        }}
                        className="absolute rounded-full blur-[1px]"
                        style={{ 
                            left: `${p.x}%`, 
                            width: p.size, 
                            height: p.size,
                            backgroundColor: p.color
                        }}
                    />
                ))}
            </div>

            <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-6"
                >
                    <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-900 tracking-tighter mb-4">
                        Evolution
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-200/60 font-light max-w-2xl mx-auto">
                        The story of how Stride grows, one release at a time.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-wrap justify-center gap-8 mt-12 text-sm font-mono text-blue-300/80"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white"><NumberTicker value={47} /></span>
                        <span className="uppercase tracking-widest text-xs mt-1">Updates</span>
                    </div>
                    <div className="w-px h-12 bg-blue-500/20"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white"><NumberTicker value={1247} /></span>
                        <span className="uppercase tracking-widest text-xs mt-1">Features</span>
                    </div>
                    <div className="w-px h-12 bg-blue-500/20"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white"><NumberTicker value={12839} /></span>
                        <span className="uppercase tracking-widest text-xs mt-1">Bugs Fixed</span>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 text-blue-400/50 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-[0.2em]">Flow with us</span>
                <ChevronDown />
            </motion.div>
        </section>
    );
};

// --- SECTION 2: LATEST RELEASE HERO ---

const FeatureCard = ({ title, icon: Icon, children, isNew = false }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            layout
            onClick={() => setIsOpen(!isOpen)}
            className={`bg-white border ${isOpen ? 'border-blue-500 shadow-xl ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'} rounded-2xl p-6 cursor-pointer transition-all overflow-hidden relative`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${isNew ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                        {isNew && <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">New</span>}
                    </div>
                </div>
                <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="text-gray-400" />
                </div>
            </div>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-100 text-gray-600 text-sm leading-relaxed"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const LatestRelease = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Left: Text Info */}
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-blue-500/20">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span>Latest Release: v2.4</span>
                        </div>
                        
                        <h2 className="text-5xl font-black text-gray-900 mb-4 leading-tight">The Focus Update</h2>
                        <p className="text-xl text-gray-500 mb-8">
                            Rebuilt from the ground up to help you find your flow. Featuring an all-new widget system and a completely redesigned Focus Mode.
                        </p>

                        <div className="grid gap-4">
                            <FeatureCard title="New Widgets System" icon={Layout} isNew>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-center gap-2"><Check size={14} className="text-green-500"/> 5 beautiful widget styles</li>
                                    <li className="flex items-center gap-2"><Check size={14} className="text-green-500"/> Interactive checkboxes</li>
                                    <li className="flex items-center gap-2"><Check size={14} className="text-green-500"/> Dark mode support</li>
                                </ul>
                                <p className="italic text-gray-500">"Your tasks should be visible without opening the app. These widgets bring Stride to your home screen."</p>
                            </FeatureCard>

                            <FeatureCard title="Focus Mode v2" icon={Eye} isNew>
                                <p className="mb-3">Focus Mode v1 was good. V2 is exceptional. We added ambient soundscapes, smoother animations, and detailed session stats.</p>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">60fps Locked</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">7 Soundscapes</span>
                                </div>
                            </FeatureCard>

                            <FeatureCard title="Performance Boost" icon={Zap}>
                                <p>We rewrote the rendering engine. App launch is now 40% faster, and scrolling lists with 10,000+ items is buttery smooth.</p>
                            </FeatureCard>

                            <FeatureCard title="12 Bug Fixes" icon={Bug}>
                                <p>Fixed notification delays on Android 14, resolved a rare crash on deletion, and polished dark mode contrast issues.</p>
                            </FeatureCard>
                        </div>
                    </div>

                    {/* Right: Visual Hero */}
                    <div className="flex-1 w-full relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] transform rotate-3 scale-105 opacity-20 blur-xl group-hover:rotate-6 transition-all duration-700"></div>
                        <div className="relative bg-gray-900 rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden aspect-[9/19] max-w-sm mx-auto">
                            {/* Mockup Screen */}
                            <div className="absolute inset-0 bg-white flex flex-col">
                                <div className="h-32 bg-gradient-to-b from-blue-500 to-blue-600 p-6 pt-12 text-white">
                                    <div className="text-xs opacity-75 uppercase tracking-widest mb-1">Focus Mode</div>
                                    <div className="text-3xl font-bold">24:59</div>
                                </div>
                                <div className="flex-1 p-6 bg-gray-50 space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse delay-75"></div>
                                    <div className="mt-8 grid grid-cols-2 gap-4">
                                        <div className="h-24 bg-white rounded-2xl shadow-sm border border-gray-100"></div>
                                        <div className="h-24 bg-white rounded-2xl shadow-sm border border-gray-100"></div>
                                    </div>
                                </div>
                                {/* Floating Widget Preview */}
                                <motion.div 
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-8 left-6 right-6 bg-white/90 backdrop-blur rounded-xl p-4 shadow-xl border border-gray-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <Layout size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">New Widgets</div>
                                            <div className="text-xs text-gray-500">Try them on your home screen</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- SECTION 3: TIMELINE ---

const ReleaseIsland = ({ version, date, title, isMajor = false, active = false }: any) => (
    <div className={`flex-shrink-0 relative group cursor-pointer transition-all duration-300 ${active ? 'scale-110 z-10' : 'scale-100 opacity-70 hover:opacity-100'}`}>
        <div className={`w-64 p-6 rounded-2xl border transition-all ${
            active 
            ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/20' 
            : isMajor 
                ? 'bg-gray-50 border-gray-300' 
                : 'bg-white border-gray-200'
        }`}>
            <div className="flex justify-between items-start mb-4">
                <span className={`font-mono font-bold ${active ? 'text-blue-600' : 'text-gray-500'}`}>{version}</span>
                {isMajor && <Star size={16} className="text-yellow-400 fill-current" />}
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
            <div className="text-xs text-gray-500">{date}</div>
            
            {active && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-blue-600">
                    See Details <ArrowRight size={12} className="ml-1" />
                </div>
            )}
        </div>
        
        {/* Connection Line Node */}
        <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-gray-200 -z-10 hidden md:block"></div>
    </div>
);

const Timeline = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <h2 className="text-3xl font-bold text-gray-900">The Journey</h2>
                <p className="text-gray-500">Scroll through history.</p>
            </div>

            <div 
                ref={scrollRef}
                className="flex overflow-x-auto pb-12 px-6 gap-8 snap-x no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {/* Timeline Items */}
                <div className="pl-[50vw]"></div> {/* Spacer to center start */}
                <ReleaseIsland version="v2.4" date="Dec 15, 2024" title="The Focus Update" active isMajor />
                <ReleaseIsland version="v2.3" date="Nov 28, 2024" title="Refinement" />
                <ReleaseIsland version="v2.2" date="Nov 10, 2024" title="Widgets Beta" />
                <ReleaseIsland version="v2.1" date="Oct 22, 2024" title="Dark Mode" />
                <ReleaseIsland version="v2.0" date="Sep 1, 2024" title="The Foundation" isMajor />
                <ReleaseIsland version="v1.5" date="Jul 15, 2024" title="Speed Boost" />
                <ReleaseIsland version="v1.0" date="Mar 20, 2024" title="Inception" isMajor />
                <div className="pr-12"></div>
            </div>
        </section>
    );
};

// --- SECTION 4: STATS DASHBOARD ---

const StatBox = ({ label, value, trend, trendLabel }: any) => (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{label}</div>
        <div className="text-3xl font-mono text-white mb-2">{value}</div>
        <div className={`text-xs flex items-center gap-1 ${trend > 0 ? 'text-green-400' : 'text-blue-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel}
        </div>
    </div>
);

const StatsDashboard = () => {
    return (
        <section className="py-24 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">By The Numbers</h2>
                        <p className="text-gray-400">Total transparency on our performance.</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-mono text-green-500">SYSTEM HEALTHY</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatBox label="Downloads" value="512,847" trend={12} trendLabel="this week" />
                    <StatBox label="Crash Rate" value="0.02%" trend={-50} trendLabel="vs v2.3" />
                    <StatBox label="Avg Rating" value="4.9 ★" trend={2} trendLabel="all time" />
                    <StatBox label="Tasks Done" value="52.4M" trend={8} trendLabel="this month" />
                </div>

                {/* Simulated Chart */}
                <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700 h-64 flex items-end gap-2">
                    {[30, 45, 35, 50, 60, 75, 65, 80, 70, 85, 90, 100].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className="flex-1 bg-blue-500/20 hover:bg-blue-500 rounded-t-sm transition-colors cursor-pointer relative group"
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Week {i + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="text-center text-xs text-gray-500 mt-4 uppercase tracking-widest">Active Users (Last 12 Weeks)</div>
            </div>
        </section>
    );
};

// --- SECTION 5: COMMUNITY & FEEDBACK ---

const Testimonial = ({ author, handle, text, image }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {image ? <img src={image} alt={author} className="w-full h-full object-cover" /> : <span className="font-bold text-gray-500">{author[0]}</span>}
            </div>
            <div>
                <div className="font-bold text-gray-900 text-sm">{author}</div>
                <div className="text-xs text-gray-400">{handle}</div>
            </div>
            <div className="ml-auto text-blue-500">
                <MessageCircle size={16} />
            </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">"{text}"</p>
    </div>
);

const Community = () => {
    return (
        <section className="py-24 bg-blue-50/50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Built With You</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">This update was shaped by 2,100+ votes and hundreds of conversations on Discord. You asked, we listened.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Testimonial 
                        author="Sarah Chen" 
                        handle="@designer_sarah" 
                        text="The new widgets are perfection. Finally I can see my day without unlocking my phone." 
                    />
                    <Testimonial 
                        author="Marcus D." 
                        handle="@dev_marcus" 
                        text="Focus Mode v2 is a game-changer for my ADHD. The white noise integration is chef's kiss." 
                    />
                    <Testimonial 
                        author="Alex Rivera" 
                        handle="@productivity_guru" 
                        text="Stride keeps getting better. Rare to see an app improve this fast without bloat." 
                    />
                </div>

                <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-200 text-center max-w-2xl mx-auto shadow-xl">
                    <h3 className="text-xl font-bold mb-4">What should we build next?</h3>
                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-500"></div>
                            <span className="font-medium text-gray-700">iOS Version</span>
                            <span className="ml-auto text-xs text-gray-400">3,421 votes</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-500"></div>
                            <span className="font-medium text-gray-700">Collaboration Features</span>
                            <span className="ml-auto text-xs text-gray-400">980 votes</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-500"></div>
                            <span className="font-medium text-gray-700">Desktop App</span>
                            <span className="ml-auto text-xs text-gray-400">1,234 votes</span>
                        </div>
                    </div>
                    <button className="text-blue-600 font-bold hover:underline">View Full Roadmap →</button>
                </div>
            </div>
        </section>
    );
};

// --- SECTION 6: EASTER EGGS (Hidden) ---

const EasterEgg = () => {
    return (
        <section className="py-12 bg-black text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <p className="text-gray-800 text-xs tracking-[0.5em] group-hover:text-gray-600 transition-colors duration-1000 cursor-help">
                SECRET: TAP THE LOGO 7 TIMES
            </p>
        </section>
    );
};

// --- MAIN PAGE COMPONENT ---

const UpdatesPage = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <UpdateRiver />
            <LatestRelease />
            
            {/* Release Philosophy */}
            <section className="py-16 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4"><Award size={20}/></div>
                        <h4 className="font-bold text-sm mb-1">Quality First</h4>
                        <p className="text-xs text-gray-500">We ship when it's ready.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4"><Shield size={20}/></div>
                        <h4 className="font-bold text-sm mb-1">No Breaking Changes</h4>
                        <p className="text-xs text-gray-500">Your workflow is sacred.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4"><RefreshCw size={20}/></div>
                        <h4 className="font-bold text-sm mb-1">Listen & Iterate</h4>
                        <p className="text-xs text-gray-500">Feedback shapes everything.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4"><Smartphone size={20}/></div>
                        <h4 className="font-bold text-sm mb-1">Legacy Support</h4>
                        <p className="text-xs text-gray-500">Works on old phones too.</p>
                    </div>
                </div>
            </section>

            <Timeline />
            <StatsDashboard />
            <Community />
            
            {/* Behind the Scenes / Developer Note */}
            <section className="py-24 bg-yellow-50 px-6">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-yellow-100 rotate-1">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                            {/* Placeholder for team photo */}
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500"><Users size={24} /></div>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">A Note From The Team</div>
                            <div className="text-sm text-gray-500">December 15, 2024</div>
                        </div>
                    </div>
                    <div className="prose prose-gray">
                        <p className="text-lg font-serif italic text-gray-700 mb-6">
                            "v2.4 was special. We spent 6 weeks just on widgets. Rebuilt Focus Mode from scratch. Why? Because you asked for it. 2,100 of you voted for widgets."
                        </p>
                        <p className="text-gray-600 mb-6">
                            Some stats that make us proud: 0 data breaches, 0.02% crash rate, and 500,000+ of you using Stride daily. But the stat that matters most is the messages saying Stride helped you get your life back.
                        </p>
                        <p className="text-gray-600 mb-8">
                            That's why we build. Thank you for being part of this journey.
                        </p>
                        <div className="font-handwriting text-2xl text-gray-800 opacity-75 transform -rotate-2">
                            - Alex, Sarah, Jordan & Team
                        </div>
                    </div>
                </div>
            </section>

            <EasterEgg />

            {/* CTA */}
            <section className="py-24 text-center px-6">
                <h2 className="text-4xl font-bold mb-6">Running an old version?</h2>
                <p className="text-gray-500 mb-8">You're missing out on 40% faster performance.</p>
                <button className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-3 mx-auto">
                    <Download size={20} /> Update Stride Now
                </button>
            </section>
        </div>
    );
};

export default UpdatesPage;