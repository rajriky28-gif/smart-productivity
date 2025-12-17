import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, MousePointer2 } from 'lucide-react';

interface HeroProps {
  onNavigate?: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1200], [-10, 10]), springConfig);

  // Awakening Sequence
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500); // 3.5s intro
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Philosophy Scroll Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0.1, 0.25, 0.3], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.45, 0.5], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.65, 0.7], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.7, 0.85, 0.9], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* 1. THE AWAKENING (Pre-loader) */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div className="relative z-10 text-center">
               <motion.div
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 3, ease: "linear" }}
                 className="h-1 bg-white mb-8 mx-auto max-w-[200px]"
               />
               <motion.h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-white uppercase">
                 {Array.from("Smart Productivity").map((char, i) => (
                   <motion.span
                     key={i}
                     initial={{ opacity: 0, filter: "blur(10px)" }}
                     animate={{ opacity: 1, filter: "blur(0px)" }}
                     transition={{ delay: i * 0.1, duration: 0.5 }}
                   >
                     {char}
                   </motion.span>
                 ))}
               </motion.h1>
            </motion.div>
            {/* Particle Explosion on Exit */}
            <motion.div 
               initial={{ opacity: 0 }}
               exit={{ opacity: 1, scale: 20 }}
               transition={{ duration: 0.8 }}
               className="absolute inset-0 bg-white mix-blend-overlay"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE IMPOSSIBLE SPACE (Hero) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden perspective-[1000px]">
        {/* Living Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(50,50,90,0.4),_rgba(0,0,0,1))]" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, repeatType: "mirror" }}
              className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ delay: 3.8, duration: 1.5 }}
            className="mb-8"
          >
             <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 leading-[0.9]">
               THE FUTURE<br/>IS HERE
             </h1>
          </motion.div>

          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 4.5, duration: 1 }}
             className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-12"
          >
             Tools that don't just help you work—they help you <span className="text-white font-semibold glow">think</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
             <button 
                onClick={() => onNavigate?.('products')}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
             >
                <span className="relative z-10 flex items-center gap-2">Enter Ecosystem <ArrowRight size={18} /></span>
                <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-0 opacity-10"></div>
             </button>
             
             <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                    <Play size={16} fill="currentColor" />
                </div>
                <span className="font-medium tracking-wide">Watch Vision</span>
             </button>
          </motion.div>
        </motion.div>
        
        {/* Floating UI Fragments */}
        <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[10%] w-64 h-40 bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl p-4 hidden lg:block opacity-60 hover:opacity-100 transition-opacity"
        >
            <div className="flex gap-2 mb-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div></div>
            <div className="space-y-2">
                <div className="h-2 bg-white/20 rounded w-3/4"></div>
                <div className="h-2 bg-white/10 rounded w-1/2"></div>
            </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Reality Shift</span>
            <div className="w-px h-16 bg-gradient-to-b from-gray-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* 3. THE PHILOSOPHY (Scroll Sequence) */}
      <section className="relative h-[400vh]">
         {/* Added pt-32 to push content below navbar and ensure visibility */}
         <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-32 pb-12">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
            
            <div className="relative z-10 w-full max-w-4xl px-6 h-full">
               <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex items-center justify-center text-center">
                  <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight">
                     Productivity tools<br/><span className="text-gray-600 line-through decoration-red-500">are broken.</span>
                  </h2>
               </motion.div>

               <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex items-center justify-center text-center">
                  <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight">
                     They make you faster.<br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">But do they make you better?</span>
                  </h2>
               </motion.div>

               <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex items-center justify-center text-center">
                  <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight">
                     We're building tools<br/>that amplify <span className="font-serif italic font-light text-yellow-400">thought</span>,<br/>not just action.
                  </h2>
               </motion.div>

               <motion.div style={{ opacity: opacity4 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-white text-black rounded-2xl flex items-center justify-center mb-8">
                     <span className="text-4xl font-bold">S</span>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-bold text-white mb-6">
                     This is Smart Productivity.
                  </h2>
               </motion.div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Hero;