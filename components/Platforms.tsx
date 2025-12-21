import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Laptop, Tablet, Watch, Slack, Github, Trello, Figma } from 'lucide-react';

const MotionDiv = motion.div as any;

const Platforms: React.FC = () => {
  return (
    <div className="bg-black text-white py-32 overflow-hidden">
      
      {/* 1. THE INTEGRATION GALAXY */}
      <section className="mb-40 relative">
         <div className="text-center mb-20 relative z-10">
            <h2 className="text-4xl font-bold mb-4">The Galaxy</h2>
            <p className="text-gray-400">Plays nicely with everyone.</p>
         </div>

         <div className="relative h-[600px] flex items-center justify-center">
             {/* Core Sun */}
             <div className="w-32 h-32 bg-white rounded-full shadow-[0_0_80px_rgba(255,255,255,0.5)] flex items-center justify-center z-20 relative">
                <span className="text-black font-bold text-2xl">Stride</span>
             </div>

             {/* Orbit 1 */}
             <div className="absolute w-[400px] h-[400px] rounded-full border border-white/10 animate-[spin_20s_linear_infinite]">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-3 rounded-full border border-gray-800">
                    <Slack size={24} className="text-white" />
                 </div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black p-3 rounded-full border border-gray-800">
                    <Github size={24} className="text-white" />
                 </div>
             </div>

             {/* Orbit 2 */}
             <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-[spin_30s_linear_infinite_reverse]">
                 <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-black p-3 rounded-full border border-gray-800">
                    <Trello size={24} className="text-blue-400" />
                 </div>
                 <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-black p-3 rounded-full border border-gray-800">
                    <Figma size={24} className="text-pink-400" />
                 </div>
             </div>
             
             {/* Stars */}
             <div className="absolute inset-0 z-0">
                 {[...Array(50)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute w-1 h-1 bg-gray-600 rounded-full"
                        style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: Math.random() }}
                    ></div>
                 ))}
             </div>
         </div>
      </section>

      {/* 2. REALITY DISTORTION (Platform Showcase) */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Everywhere At Once</h2>
            <p className="text-gray-400">One mind, many devices.</p>
         </div>

         <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
                { icon: <Smartphone size={32} />, label: "Mobile" },
                { icon: <Tablet size={32} />, label: "Tablet" },
                { icon: <Laptop size={32} />, label: "Laptop" },
                { icon: <Monitor size={32} />, label: "Desktop" },
                { icon: <Watch size={32} />, label: "Watch" },
            ].map((device, i) => (
                <MotionDiv 
                    key={i}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="flex flex-col items-center gap-4 text-gray-500 hover:text-white transition-colors cursor-pointer group"
                >
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all">
                        {device.icon}
                    </div>
                    <span className="font-medium">{device.label}</span>
                </MotionDiv>
            ))}
         </div>
         
         <div className="mt-20 text-center">
             <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-mono text-gray-400">
                 System Status: <span className="text-green-400">Synchronized</span>
             </div>
         </div>
      </section>
    </div>
  );
};

export default Platforms;