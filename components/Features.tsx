import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Users, Globe, Lock, BarChart3, Cloud, Layout, Smartphone, Mail, Calendar, Cpu, Search, Command, RefreshCw } from 'lucide-react';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    { icon: <Zap />, title: "Brain-Like Task Management", desc: "Tasks that organize themselves based on your habits." },
    { icon: <RefreshCw />, title: "Real-Time Sync", desc: "State updates instantly across all devices." },
    { icon: <Users />, title: "Collaboration", desc: "Multiplayer mode for your projects." },
    { icon: <Shield />, title: "Zero-Knowledge Encryption", desc: "We can't read your data. No one can." },
    { icon: <Cpu />, title: "AI Assistant", desc: "Generative help for writing and planning." },
    { icon: <Layout />, title: "Custom Workflows", desc: "Kanban, List, or Calendar - your choice." },
    { icon: <BarChart3 />, title: "Deep Analytics", desc: "Visualize your productivity velocity." },
    { icon: <Smartphone />, title: "Native Mobile", desc: "iOS and Android apps that feel native." },
  ];

  return (
    <div id="features" className="bg-black text-white py-32 relative">
      
      {/* 1. THE FEATURE MATRIX */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4">The Capabilities</h2>
          <p className="text-gray-400">A grid of pure power.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              onHoverStart={() => setActiveFeature(idx)}
              onHoverEnd={() => setActiveFeature(null)}
              className="relative aspect-square border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/5 transition-colors group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  {feature.desc}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. THE COMPARISON DESTROYER */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left: The Old Way */}
          <div className="bg-gray-900 flex items-center justify-center relative overflow-hidden p-8 border-r border-gray-800">
             <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
             <div className="text-center opacity-50 blur-[1px] grayscale">
                <h3 className="text-4xl font-bold text-gray-500 mb-8">The Old Way</h3>
                
                {/* Chaotic UI Elements */}
                <div className="relative w-80 h-96 mx-auto">
                    <div className="absolute top-0 left-0 bg-gray-800 p-4 rounded shadow-lg w-64 transform -rotate-6">
                        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                        <div className="h-2 bg-gray-700 rounded w-full mb-1"></div>
                        <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                    </div>
                    <div className="absolute top-20 right-0 bg-gray-800 p-4 rounded shadow-lg w-56 transform rotate-12 z-10">
                         <div className="w-8 h-8 rounded-full bg-red-900 mb-2"></div>
                         <div className="h-2 bg-gray-700 rounded w-full"></div>
                    </div>
                    <div className="absolute bottom-10 left-10 bg-gray-800 p-4 rounded shadow-lg w-64 transform -rotate-3 z-20 border border-red-500/20">
                         <div className="text-red-500 font-mono text-xs mb-2">ERROR: 404</div>
                         <div className="h-2 bg-gray-700 rounded w-full"></div>
                    </div>
                </div>
                <div className="mt-8 text-xl font-mono text-red-500">Chaos. Stress. Burnout.</div>
             </div>
          </div>

          {/* Right: The Smart Way */}
          <div className="bg-black flex items-center justify-center relative overflow-hidden p-8">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
             <div className="text-center z-10">
                <h3 className="text-4xl font-bold text-white mb-8">The Smart Way</h3>
                
                {/* Clean UI Elements */}
                <div className="relative w-80 h-96 mx-auto flex flex-col gap-4">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900/80 backdrop-blur border border-white/10 p-4 rounded-xl flex items-center gap-4"
                    >
                        <div className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center"><div className="w-3 h-3 bg-green-500 rounded-full"></div></div>
                        <div className="flex-1 h-2 bg-white/20 rounded"></div>
                    </motion.div>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-900/80 backdrop-blur border border-white/10 p-4 rounded-xl flex items-center gap-4"
                    >
                        <div className="w-5 h-5 rounded-full border border-gray-600"></div>
                        <div className="flex-1 h-2 bg-white/20 rounded"></div>
                    </motion.div>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-900/80 backdrop-blur border border-white/10 p-4 rounded-xl flex items-center gap-4"
                    >
                         <div className="w-5 h-5 rounded-full border border-gray-600"></div>
                         <div className="flex-1 h-2 bg-white/20 rounded"></div>
                    </motion.div>
                </div>
                <div className="mt-8 text-xl font-mono text-blue-400">Focus. Flow. Done.</div>
             </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black font-bold">VS</div>
        </div>
      </section>
    </div>
  );
};

export default Features;