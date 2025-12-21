import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Brain, Smartphone, 
  WifiOff, Settings, Users, Play, Star, Monitor, Tablet, Laptop,
  Cloud, Shield
} from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionP = motion.p as any;

const Products: React.FC = () => {
  // State for testimonials
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    { quote: "Finally, a task manager that doesn't overwhelm me. Stride just works.", author: "Alex Rivera, Freelance Developer", rating: 5 },
    { quote: "Our team's productivity jumped 40% after switching to Stride. Simple yet powerful.", author: "Jordan Lee, Product Manager @ TechCo", rating: 5 },
    { quote: "Juggling classes and projects became so much easier. Stride keeps me on track.", author: "Maya Patel, Student", rating: 5 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Orbs data
  const orbs = [
    { icon: <Brain size={20} />, label: "Intelligent Scheduling", color: "blue", angle: 0 },
    { icon: <Smartphone size={20} />, label: "Cross-Platform Sync", color: "purple", angle: 60 },
    { icon: <Shield size={20} />, label: "Privacy First", color: "green", angle: 120 },
    { icon: <Users size={20} />, label: "Team Collaboration", color: "orange", angle: 180 },
    { icon: <WifiOff size={20} />, label: "Offline Mode", color: "gray", angle: 240 },
    { icon: <Settings size={20} />, label: "Customizable", color: "pink", angle: 300 },
  ];

  return (
    <div id="products" className="bg-black text-white min-h-screen relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000_100%)]"></div>
             {/* Floating Particles */}
             <div className="absolute inset-0 opacity-30">
                 {[...Array(20)].map((_, i) => (
                     <div key={i} className="absolute bg-white rounded-full w-1 h-1" style={{ 
                         top: `${Math.random() * 100}%`, 
                         left: `${Math.random() * 100}%`,
                         opacity: Math.random() 
                     }} />
                 ))}
             </div>
        </div>

        {/* Main Content Container */}
        <section className="relative z-10 pt-32 pb-32 overflow-hidden perspective-[2000px]">
            
            {/* 1. Headline - 3D Typography */}
            <div className="text-center mb-16 relative z-20">
                <MotionDiv
                    initial={{ opacity: 0, y: 50, rotateX: 20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-4"
                >
                    <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
                        STRIDE
                    </h2>
                </MotionDiv>
                <MotionP 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-2xl md:text-3xl font-light text-gray-400 font-serif italic"
                >
                    Your tasks, perfectly orchestrated.
                </MotionP>
                <MotionDiv 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="inline-block mt-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur text-xs font-bold uppercase tracking-widest text-blue-400"
                >
                    Task Management Reimagined
                </MotionDiv>
            </div>

            {/* 2. The Hero Moment - Living Devices & Orbs */}
            <div className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[700px] flex items-center justify-center perspective-[3000px] mb-20">
                
                {/* Orbital Rings (Visual Guide) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/20 animate-[spin_60s_linear_infinite]"></div>
                    <div className="absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] rounded-full border border-white/10 animate-[spin_80s_linear_infinite_reverse]"></div>
                </div>

                {/* Central Devices Cluster */}
                <MotionDiv 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="relative z-10 w-full h-full flex items-center justify-center transform-style-3d group"
                >
                    {/* Laptop */}
                    <MotionDiv 
                        className="relative w-[300px] md:w-[600px] h-[180px] md:h-[350px] bg-gray-900 rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transform: 'perspective(1000px) rotateX(5deg)' }}
                    >
                         {/* Screen Content */}
                         <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
                             <div className="w-2 h-2 rounded-full bg-red-500"></div>
                             <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                             <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         </div>
                         <div className="flex-1 bg-gray-900 p-4 md:p-6 flex gap-4">
                             <div className="w-1/4 h-full bg-gray-800/50 rounded-lg animate-pulse hidden md:block"></div>
                             <div className="flex-1 space-y-3">
                                 <div className="h-4 md:h-8 w-1/3 bg-gray-800/50 rounded-lg"></div>
                                 <div className="space-y-2">
                                     {[1,2,3,4].map(i => (
                                         <div key={i} className="h-8 md:h-12 w-full bg-gray-800/30 rounded-lg border border-gray-700/30 flex items-center px-4 gap-4">
                                             <div className="w-3 md:w-4 h-3 md:h-4 rounded-full border border-gray-500"></div>
                                             <div className="h-2 w-1/2 bg-gray-700 rounded"></div>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         </div>
                    </MotionDiv>

                    {/* Tablet */}
                    <MotionDiv 
                        className="absolute bottom-[-20px] left-0 md:left-[-50px] w-[120px] md:w-[200px] h-[160px] md:h-[280px] bg-gray-800 rounded-xl border border-gray-600 shadow-xl overflow-hidden hidden sm:block"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        style={{ transform: 'perspective(1000px) rotateY(15deg) translateZ(50px)' }}
                    >
                        <div className="p-3 space-y-3">
                            <div className="h-4 w-1/2 bg-gray-600 rounded"></div>
                            <div className="grid grid-cols-2 gap-2">
                                {[1,2,3,4].map(i => <div key={i} className="h-12 md:h-20 bg-gray-700/50 rounded-lg"></div>)}
                            </div>
                        </div>
                    </MotionDiv>

                    {/* Phone */}
                    <MotionDiv 
                        className="absolute bottom-[-10px] right-0 md:right-[-30px] w-[70px] md:w-[100px] h-[140px] md:h-[200px] bg-black rounded-[15px] border-2 md:border-4 border-gray-800 shadow-xl overflow-hidden"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        style={{ transform: 'perspective(1000px) rotateY(-15deg) translateZ(80px)' }}
                    >
                         <div className="h-full bg-gray-900 p-2 space-y-2">
                             <div className="h-1 md:h-2 w-3/4 bg-gray-700 rounded mx-auto mt-2"></div>
                             {[1,2,3,4,5].map(i => <div key={i} className="h-6 md:h-8 bg-gray-800 rounded border border-gray-700"></div>)}
                         </div>
                    </MotionDiv>
                </MotionDiv>

                {/* Orbs - The Feature Constellation */}
                <div className="absolute inset-0 pointer-events-none">
                {orbs.map((orb, i) => (
                    <MotionDiv
                        key={i}
                        className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-900/90 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer pointer-events-auto group hover:scale-110 transition-all duration-300 z-20 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:border-blue-400/50"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${orb.angle}deg) translate(clamp(140px, 28vw, 380px)) rotate(-${orb.angle}deg)`
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                    >
                        <div className={`text-${orb.color}-400 group-hover:text-white transition-colors`}>{orb.icon}</div>
                        
                        {/* Tooltip */}
                        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 bg-gray-900/95 backdrop-blur p-3 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center shadow-xl">
                            <h4 className="text-white font-bold text-sm mb-1">{orb.label}</h4>
                            <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto animate-pulse"></div>
                        </div>
                    </MotionDiv>
                ))}
                </div>

                {/* Stats Layer */}
                <MotionDiv 
                    className="absolute top-0 left-0 md:top-[10%] md:left-[10%] bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hidden lg:block"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="text-2xl font-bold text-white">500,000+</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">Active Users</div>
                </MotionDiv>
                
                <MotionDiv 
                    className="absolute bottom-0 right-0 md:bottom-[20%] md:right-[10%] bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hidden lg:block"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <div className="flex text-yellow-400 mb-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                    <div className="text-2xl font-bold text-white">4.9/5</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">Average Rating</div>
                </MotionDiv>

            </div>

            {/* 3. Action Zone */}
            <div className="relative z-20 text-center px-6">
                 <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                     <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                         <span className="relative z-10 flex items-center gap-2">Start Using Stride <ArrowRight size={20} /></span>
                         <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                     </button>
                     
                     <button className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all group">
                         <Play size={20} className="group-hover:text-blue-400 transition-colors" />
                         See It In Action
                     </button>
                 </div>
                 
                 <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                     <span className="flex items-center gap-2"><CreditCardOff /> No credit card required</span>
                     <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                     <span>Free forever plan</span>
                 </div>

                 {/* Platforms */}
                 <div className="mt-16">
                     <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">Download for your platform</p>
                     <div className="flex justify-center gap-8 text-gray-600">
                         <Monitor size={24} className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                         <Smartphone size={24} className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                         <Tablet size={24} className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                         <Laptop size={24} className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                         <Cloud size={24} className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                     </div>
                 </div>
            </div>

            {/* 4. Trust Layer - Testimonials */}
            <div className="max-w-4xl mx-auto mt-32 px-6">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent"></div>
                    <AnimatePresence mode="wait">
                        <MotionDiv
                            key={activeTestimonial}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            <div className="flex justify-center mb-6">
                                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                    <Star key={i} size={20} className="text-yellow-500" fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-2xl md:text-3xl font-serif italic text-white mb-6 leading-relaxed">"{testimonials[activeTestimonial].quote}"</p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black border border-gray-600 flex items-center justify-center text-white font-bold text-xs">
                                    {testimonials[activeTestimonial].author.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <div className="text-white font-bold text-sm">{testimonials[activeTestimonial].author}</div>
                                </div>
                            </div>
                        </MotionDiv>
                    </AnimatePresence>
                    
                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8 relative z-10">
                        {testimonials.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`h-1.5 rounded-full transition-all ${i === activeTestimonial ? 'bg-white w-6' : 'bg-gray-600 w-2 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Future Teaser */}
            <div className="mt-40 text-center relative z-10 pb-20">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent -z-10 h-full w-full"></div>
                <h3 className="text-gray-500 font-light text-lg mb-12 tracking-widest uppercase">Stride is just the beginning</h3>
                <div className="flex justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <div className="group cursor-pointer">
                        <div className="w-32 h-20 md:w-40 md:h-24 bg-gray-900 rounded-lg blur-sm group-hover:blur-none transition-all border border-white/5 group-hover:border-blue-500/50 flex items-center justify-center">
                            <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Project Phoenix</span>
                        </div>
                        <span className="text-[10px] text-gray-600 mt-3 block uppercase tracking-wider">Coming 2025</span>
                    </div>
                    <div className="group cursor-pointer">
                        <div className="w-32 h-20 md:w-40 md:h-24 bg-gray-900 rounded-lg blur-sm group-hover:blur-none transition-all border border-white/5 group-hover:border-purple-500/50 flex items-center justify-center">
                             <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Project Atlas</span>
                        </div>
                        <span className="text-[10px] text-gray-600 mt-3 block uppercase tracking-wider">Coming 2026</span>
                    </div>
                </div>
                
                <div className="mt-16">
                     <button className="text-sm text-gray-500 hover:text-white border-b border-gray-700 hover:border-white transition-colors pb-1">Join the waitlist for future products</button>
                </div>
            </div>
            
        </section>
    </div>
  );
};

// Helper for 'No Credit Card' icon since it's not standard in all Lucide versions
const CreditCardOff = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="1" y1="1" x2="23" y2="23"></line>
        <path d="M1 9h6"></path>
        <path d="M23 9h-4"></path>
        <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path>
    </svg>
)

export default Products;