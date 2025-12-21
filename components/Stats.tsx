import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const Stats: React.FC = () => {
  // Generate random particles
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 2
  }));

  return (
    <section className="relative h-[80vh] bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* 1. SOCIAL PROOF CONSTELLATION */}
      <div className="absolute inset-0 z-0">
         {particles.map((p, i) => (
             <MotionDiv
               key={i}
               animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
               }}
               transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
               className="absolute bg-blue-500 rounded-full blur-[1px]"
               style={{
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size
               }}
             />
         ))}
      </div>

      <div className="relative z-10 text-center px-6">
         <MotionDiv 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="mb-12"
         >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">Trusted by the Future</h2>
            <p className="text-blue-400 text-xl font-mono">Join the constellation.</p>
         </MotionDiv>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
                { label: "Active Users", value: "500K+" },
                { label: "Countries", value: "150+" },
                { label: "Tasks Done", value: "50M+" },
                { label: "Happiness", value: "99%" },
            ].map((stat, i) => (
                <MotionDiv 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
                >
                    <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
                </MotionDiv>
            ))}
         </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>
    </section>
  );
};

export default Stats;