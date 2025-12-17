import React from 'react';
import { motion } from 'framer-motion';

const CallToAction: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 1. THE PORTAL */}
      
      {/* Background Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_black_70%)]"></div>
      
      <div className="relative z-10 text-center px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="mb-12"
        >
            <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                BEGIN<br/>THE FUTURE
            </h2>
            <p className="text-xl text-gray-400 font-light">Your new reality awaits.</p>
        </motion.div>

        {/* The Portal Button */}
        <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center bg-white text-black font-bold text-xl md:text-2xl tracking-widest uppercase z-20 mx-auto"
        >
            <span className="relative z-10">Start</span>
            
            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-white opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500 animate-pulse"></div>
            <div className="absolute -inset-4 rounded-full border border-white/20 scale-90 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -inset-8 rounded-full border border-white/10 scale-75 group-hover:scale-110 transition-transform duration-1000"></div>
        </motion.button>
        
        <div className="mt-12 space-x-6 text-sm text-gray-500 font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">No Credit Card</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cancel Anytime</span>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;