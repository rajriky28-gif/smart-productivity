import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, useMotionValueEvent } from 'framer-motion';
import { 
  Check, Clock, Calendar, MessageSquare, Zap, Moon, Sun, 
  Smartphone, Shield, Battery, Signal, Wifi, ChevronRight, 
  Star, Play, Download, Search, Settings, Menu, X, Share2, 
  Mic, Globe, ArrowRight, Layout, Send, User, Plus
} from 'lucide-react';

// --- UTILS & SHARED COMPONENTS ---

const PhoneFrame = ({ children, theme = 'light', className = '' }: { children?: React.ReactNode, theme?: 'light' | 'dark', className?: string }) => (
  <div className={`relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden ${className}`}>
    {/* Dynamic Island / Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20 flex justify-center items-center gap-2">
        <div className="w-16 h-4 bg-gray-900/50 rounded-full"></div>
    </div>
    
    {/* Screen Content */}
    <div className={`w-full h-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} relative overflow-hidden flex flex-col`}>
      {/* Status Bar */}
      <div className="h-10 px-6 flex justify-between items-center text-[10px] font-medium opacity-70 pt-2 z-10">
        <span>9:41</span>
        <div className="flex gap-1.5">
          <Signal size={12} />
          <Wifi size={12} />
          <Battery size={12} />
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 relative overflow-y-auto no-scrollbar bg-white">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400/50 rounded-full z-20"></div>
    </div>

    {/* Reflection/Glare */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[2.5rem] z-30"></div>
  </div>
);

// --- SECTIONS ---

// 1. OPENING SEQUENCE
const OpeningSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence Timeline
    const timer1 = setTimeout(() => setStep(1), 800);   // Appear
    const timer2 = setTimeout(() => setStep(2), 2000);  // Start expanding
    const timer3 = setTimeout(() => onComplete(), 3800); // Trigger page reveal (gives time for expansion)

    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, [onComplete]);

  return (
    <motion.div 
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      
      {step >= 1 && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
              scale: step === 2 ? 600 : 1, // Increased scale to ensure full coverage on large screens
              opacity: 1 
          }}
          transition={{ 
              duration: step === 2 ? 1.5 : 0.8, 
              ease: step === 2 ? [0.7, 0, 0.84, 0] : "easeInOut" // Custom ease for dramatic expansion
          }}
          className="w-2 h-2 bg-white rounded-full shadow-[0_0_50px_rgba(255,255,255,0.8)]"
        />
      )}
      
      <AnimatePresence>
        {step === 1 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="absolute mt-12 text-gray-500 font-mono text-xs tracking-[0.5em] z-10"
            >
                WAKING UP
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 2. HERO SECTION
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] pt-32 pb-20">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
         {[...Array(30)].map((_, i) => (
            <motion.div
               key={i}
               animate={{ 
                 y: [0, -100], 
                 opacity: [0, 0.5, 0] 
               }}
               transition={{ 
                 duration: Math.random() * 5 + 5, 
                 repeat: Infinity, 
                 delay: Math.random() * 5 
               }}
               className="absolute w-1 h-1 bg-orange-200/20 rounded-full blur-[1px]"
               style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100 + 20}%` }}
            />
         ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center mb-10 px-6">
         <motion.h1 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-tighter"
         >
           Stride
         </motion.h1>
         <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl font-serif italic text-orange-200/60 mt-4"
         >
            Your day, beautifully organized.
         </motion.p>
      </motion.div>

      <motion.div
         initial={{ y: 100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 1, delay: 1 }}
         className="relative z-20"
      >
         <PhoneFrame className="scale-75 md:scale-100 origin-top shadow-[0_0_100px_rgba(255,165,0,0.15)]">
            <img 
              src="/image/home-sereen.jpg" 
              alt="Stride App Home Screen" 
              className="w-full h-full object-cover bg-gray-100"
              onError={(e) => {
                // Fallback to a placeholder if the local path is incorrect
                e.currentTarget.src = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80";
              }}
            />
         </PhoneFrame>
      </motion.div>
      
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5 }}
         className="absolute bottom-10 animate-bounce text-gray-500 flex flex-col items-center gap-2"
      >
         <span className="text-xs uppercase tracking-widest">Scroll to unlock</span>
         <ChevronRight className="rotate-90" />
      </motion.div>
    </section>
  );
};

// 3. DAY JOURNEY
const DayJourney = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    
    // Background Color Interpolation
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ["#FFF7ED", "#F0F9FF", "#FDF4FF", "#111827", "#000000"]
    );

    // Phone Screens Content based on scroll
    const [screenStep, setScreenStep] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        let newStep = 0;
        if (latest < 0.2) newStep = 0;
        else if (latest < 0.4) newStep = 1;
        else if (latest < 0.6) newStep = 2;
        else if (latest < 0.8) newStep = 3;
        else newStep = 4;
        
        setScreenStep(prev => {
            if (prev !== newStep) return newStep;
            return prev;
        });
    });

    const phoneContent = [
        // 7 AM
        <div key="morning" className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <Sun className="text-orange-500" />
                <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Morning Ritual</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Start Fresh</h3>
            <div className="space-y-3">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-orange-100 flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white"><Check size={14}/></div>
                    <div className="flex-1"><div className="font-medium line-through text-gray-400">Wake up early</div></div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
                    <div className="flex-1"><div className="font-medium">Drink water</div></div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
                    <div className="flex-1"><div className="font-medium">Plan the day</div></div>
                </div>
            </div>
        </div>,
        // 9 AM
        <div key="focus" className="p-6 h-full bg-gray-50 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 relative">
                 <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                     <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                     <circle cx="40" cy="40" r="36" stroke="#3b82f6" strokeWidth="4" fill="none" strokeDasharray="226" strokeDashoffset="40" />
                 </svg>
                 <span className="text-xl font-bold font-mono">24:12</span>
             </div>
             <h3 className="text-xl font-bold mb-1">Deep Work</h3>
             <p className="text-gray-500 text-sm mb-8">Blocking distractions...</p>
             <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 opacity-50 blur-[1px]">
                 <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                 <div className="h-2 bg-gray-100 rounded w-1/2 mx-auto"></div>
             </div>
        </div>,
        // 2 PM
        <div key="collab" className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                </div>
                <span className="text-sm font-medium text-gray-500">Team Sync</span>
            </div>
            <div className="space-y-4">
                 <div className="bg-blue-50 p-4 rounded-xl rounded-tl-none border border-blue-100 ml-4">
                     <p className="text-sm text-blue-900">Just updated the slide deck!</p>
                     <span className="text-[10px] text-blue-400 mt-1 block">1:58 PM</span>
                 </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <div className="flex justify-between mb-2">
                        <span className="font-bold text-sm">Q3 Review</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Active</span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500 w-3/4"></div>
                     </div>
                 </div>
            </div>
            <div className="mt-auto bg-gray-100 p-3 rounded-full flex gap-2 text-gray-400">
                 <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"><Mic size={14} /></div>
                 <div className="flex-1 flex items-center px-2 text-xs">Add a comment...</div>
                 <div className="w-8 h-8 flex items-center justify-center"><Send size={14} /></div>
            </div>
        </div>,
        // 6 PM
        <div key="evening" className="p-6 h-full bg-indigo-50 flex flex-col">
            <h3 className="text-2xl font-bold mb-2 text-indigo-900">Wrap Up</h3>
            <p className="text-indigo-600/60 mb-8 text-sm">You crushed it today!</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">12</div>
                    <div className="text-[10px] text-gray-400 uppercase">Tasks Done</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <div className="text-3xl font-bold text-green-500 mb-1">4h</div>
                    <div className="text-[10px] text-gray-400 uppercase">Focus Time</div>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">🎉</div>
                 <div>
                     <div className="font-bold text-sm">Daily Goal Met</div>
                     <div className="text-xs text-gray-500">Streak: 14 days</div>
                 </div>
            </div>
        </div>,
        // 11 PM
        <div key="night" className="p-6 h-full flex flex-col justify-center items-center text-center bg-gray-900 text-white">
             <Moon className="text-purple-400 mb-6 w-16 h-16" />
             <h3 className="text-2xl font-bold mb-2">Sleep Well</h3>
             <p className="text-gray-400 text-sm max-w-[200px]">Your tasks are safe. Tomorrow is a new start.</p>
             <div className="mt-8 flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75"></div>
                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150"></div>
             </div>
        </div>
    ];

    return (
        <motion.section style={{ backgroundColor }} ref={containerRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl px-6 items-center">
                    
                    {/* Left: Phone Display */}
                    <div className="flex justify-center md:justify-end md:pr-12 order-2 md:order-1">
                        <PhoneFrame theme={screenStep === 4 ? 'dark' : 'light'} className="shadow-2xl transition-all duration-500">
                             <AnimatePresence mode="wait">
                                 <motion.div
                                     key={screenStep}
                                     initial={{ opacity: 0, y: 20 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     exit={{ opacity: 0, y: -20 }}
                                     transition={{ duration: 0.4 }}
                                     className="h-full"
                                 >
                                     {phoneContent[screenStep]}
                                 </motion.div>
                             </AnimatePresence>
                        </PhoneFrame>
                    </div>

                    {/* Right: Text Narrative (Moves as we scroll, implemented via absolute positioning in the parent relative container usually, but here we can just update text based on step) */}
                    <div className="order-1 md:order-2 mb-10 md:mb-0 md:pl-12">
                         <AnimatePresence mode="wait">
                             <motion.div
                                key={screenStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                             >
                                <span className={`text-sm font-bold uppercase tracking-widest ${screenStep === 4 ? 'text-purple-400' : 'text-blue-600'}`}>
                                    {['7:00 AM', '9:00 AM', '2:00 PM', '6:00 PM', '11:00 PM'][screenStep]}
                                </span>
                                <h2 className={`text-4xl md:text-6xl font-bold ${screenStep === 4 ? 'text-white' : 'text-gray-900'}`}>
                                    {['Start Fresh', 'Deep Focus', 'Team Sync', 'Reflect', 'Rest Easy'][screenStep]}
                                </h2>
                                <p className={`text-xl ${screenStep === 4 ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                                    {[
                                        "Begin your day with clarity. See everything that matters, nothing that doesn't.",
                                        "Tap any task to enter Focus Mode. The world fades. Only your work remains.",
                                        "Share lists. Assign tasks. Stay synchronized. Collaboration happens in real-time.",
                                        "Watch your completed tasks. Feel the satisfaction of a day well spent.",
                                        "Your tasks are safe. Your mind is clear. Sleep well."
                                    ][screenStep]}
                                </p>
                             </motion.div>
                         </AnimatePresence>
                    </div>

                </div>
            </div>
        </motion.section>
    );
};

// 4. CONSTELLATION (Features)
const Constellation = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const features = [
        { label: "Smart Scheduling", x: 50, y: 15, icon: <Calendar size={24} /> },
        { label: "Quick Capture", x: 15, y: 45, icon: <Zap size={24} /> },
        { label: "Focus Mode", x: 85, y: 45, icon: <Layout size={24} /> },
        { label: "Offline First", x: 20, y: 80, icon: <Wifi size={24} /> },
        { label: "Privacy", x: 80, y: 80, icon: <Shield size={24} /> },
    ];

    return (
        <section className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center py-20">
             {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]"></div>
            
            <div className="relative z-10 w-full max-w-6xl h-[600px] md:h-[800px] flex flex-col items-center">
                <div className="text-center mb-16 relative z-20">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">The Stride Ecosystem</h2>
                    <p className="text-gray-400 text-lg">Everything connects. Everything flows.</p>
                </div>

                {/* Star Map Container */}
                <div className="relative w-full h-full max-w-4xl">
                    
                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {features.map((f, i) => {
                            const isHovered = hoveredIndex === i;
                            return (
                                <motion.line 
                                    key={i}
                                    x1="50%" 
                                    y1="50%" 
                                    x2={`${f.x}%`} 
                                    y2={`${f.y}%`} 
                                    stroke={isHovered ? "#3b82f6" : "#333"} 
                                    strokeWidth={isHovered ? "2" : "1"}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    className="transition-colors duration-300"
                                />
                            );
                        })}
                    </svg>

                    {/* Features Nodes */}
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{ left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(-50%, -50%)' }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", delay: i * 0.1 }}
                                className="relative flex flex-col items-center justify-center cursor-pointer group"
                            >
                                {/* Icon Circle */}
                                <motion.div 
                                    whileHover={{ scale: 1.2, backgroundColor: "#fff", color: "#000" }}
                                    className="w-20 h-20 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-colors duration-300"
                                >
                                    <div className="text-gray-400 group-hover:text-black transition-colors duration-300">
                                        {f.icon}
                                    </div>
                                </motion.div>
                                
                                {/* Label */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-24 w-40 text-center"
                                >
                                    <span className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${hoveredIndex === i ? 'text-blue-400' : 'text-gray-500'}`}>
                                        {f.label}
                                    </span>
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}

                    {/* Central Core */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <motion.div 
                            animate={{ 
                                boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 60px rgba(59,130,246,0.6)", "0 0 20px rgba(59,130,246,0.2)"] 
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-32 h-32 bg-white rounded-full flex items-center justify-center z-20 relative"
                        >
                            <span className="text-black font-black text-xl tracking-tight">STRIDE</span>
                            
                            {/* Orbiting particles */}
                            <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                                <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[1px]"></div>
                            </div>
                        </motion.div>
                        
                        {/* Pulse Rings */}
                        <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 5. SPEED TEST
const SpeedTest = () => {
    const [started, setStarted] = useState(false);
    const [strideProgress, setStrideProgress] = useState(0);
    const [otherProgress, setOtherProgress] = useState(0);
    const [winner, setWinner] = useState<null | 'stride'>(null);

    const startRace = () => {
        setStarted(true);
        setStrideProgress(0);
        setOtherProgress(0);
        setWinner(null);
    };

    useEffect(() => {
        if (!started) return;
        
        const interval = setInterval(() => {
            setStrideProgress(prev => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 8 + 2; // Stride is fast
            });
            setOtherProgress(prev => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 2; // Others are slow
            });
        }, 50);

        return () => clearInterval(interval);
    }, [started]);

    useEffect(() => {
        if (strideProgress >= 100 && !winner) {
            setWinner('stride');
            setStarted(false);
        }
    }, [strideProgress, winner]);

    return (
        <section className="py-32 bg-black text-white px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-4">Built for Speed</h2>
                <p className="text-gray-400 mb-16">Don't let your tools slow you down.</p>
                
                <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
                    {/* Lane 1: Stride */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-white flex items-center gap-2"><Zap size={16} className="text-yellow-400"/> Stride</span>
                            <span className="text-yellow-400 font-mono">{winner === 'stride' ? 'DONE (0.4s)' : `${Math.round(strideProgress)}%`}</span>
                        </div>
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden relative">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" 
                                style={{ width: `${strideProgress}%` }}
                            />
                            {winner === 'stride' && <motion.div layoutId="flag" className="absolute right-0 top-0 bottom-0 w-1 bg-white" />}
                        </div>
                    </div>

                    {/* Lane 2: Others */}
                    <div className="mb-12">
                         <div className="flex justify-between mb-2 opacity-50">
                            <span className="font-bold text-white">Typical App</span>
                            <span className="font-mono">{Math.round(otherProgress)}%</span>
                        </div>
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden opacity-50">
                            <motion.div 
                                className="h-full bg-gray-600" 
                                style={{ width: `${otherProgress}%` }}
                            />
                        </div>
                    </div>

                    <button 
                        onClick={startRace}
                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition active:scale-95"
                    >
                        {winner ? 'Run Again' : started ? 'Running...' : 'Start Speed Test'}
                    </button>
                    
                    {winner && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 p-4 bg-green-900/30 border border-green-500/30 rounded-xl text-green-400"
                        >
                            Stride is <span className="font-bold">3x faster</span> than the competition.
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

// 6. DOWNLOAD CTA
const DownloadCTA = () => {
    return (
        <section className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center px-6 relative overflow-hidden">
             {/* Dynamic Background */}
             <div className="absolute inset-0 z-0">
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1),transparent_70%)]"></div>
             </div>

             <div className="relative z-10 text-center max-w-4xl">
                 <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 inline-block"
                 >
                     <div className="w-32 h-32 bg-black text-white rounded-[2.5rem] flex items-center justify-center text-5xl font-bold shadow-2xl mx-auto mb-8">
                         S
                     </div>
                 </motion.div>

                 <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">
                    Your Best Days<br/>Start Here.
                 </h2>

                 <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white px-12 py-6 rounded-full font-bold text-xl md:text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all flex items-center gap-4 mx-auto"
                 >
                    <Play fill="currentColor" size={24} />
                    Download on Google Play
                 </motion.button>
                 
                 <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-2"><Check size={16} className="text-green-500"/> Free Forever</span>
                    <span className="flex items-center gap-2"><Check size={16} className="text-green-500"/> No Ads</span>
                    <span className="flex items-center gap-2"><Check size={16} className="text-green-500"/> Offline First</span>
                 </div>

                 <div className="mt-8 text-xs text-gray-400">
                    Currently available for Android. <a href="#" className="underline hover:text-black">Join iOS Waitlist</a>.
                 </div>
             </div>
        </section>
    );
};

// --- MAIN PAGE ---

const StridePage = () => {
    const [loading, setLoading] = useState(true);

    // Lock body scroll during loading
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [loading]);

    // Force scroll to top on mount
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
        <div className="font-sans bg-white min-h-screen">
            <AnimatePresence>
                {loading && <OpeningSequence onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
                <>
                    <Hero />
                    <DayJourney />
                    <Constellation />
                    <SpeedTest />
                    <DownloadCTA />
                </>
            )}
        </div>
    );
};

export default StridePage;