import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Zap, Shield, Globe, Cpu, Layers, Lock, Clock, Sparkles, LayoutDashboard, Smartphone, Cloud, CircleHelp, Users } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen pt-20 overflow-hidden">
      {/* 1. Hero Section - The Gallery Entrance */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Noise Texture & Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
        </div>

        {/* 3D Isometric Grid (Abstract Background) */}
        <div className="absolute inset-0 z-0 opacity-20 perspective-[1000px] pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] grid grid-cols-[repeat(20,1fr)] gap-4 transform rotate-x-[60deg] rotate-z-[45deg]">
              {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="bg-gray-200/50 rounded-lg backdrop-blur-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
           </div>
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-black mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-light font-serif italic text-gray-500"
          >
            Crafted tools for the modern workflow
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-400 text-sm font-medium tracking-widest uppercase flex flex-col items-center gap-2"
            >
            Scroll to explore
            <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
            </motion.div>
        </div>
      </section>

      {/* 2. Product Showcase Grid - The Gallery Floor */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* 3. Stride - Featured Product Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 row-span-2 group relative bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
          >
            {/* Animated Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
            <div className="absolute inset-[2px] bg-white rounded-[2.4rem] z-0"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Top Half */}
              <div className="p-10 pb-0 flex-1 flex flex-col items-start">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Task Management</span>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Stride</h2>
                <p className="text-xl text-gray-500 font-light italic mb-8">Your tasks, perfectly orchestrated.</p>
                
                {/* Hero Visual */}
                <div className="relative w-full flex-1 min-h-[300px] perspective-[1000px] group-hover:scale-[1.02] transition-transform duration-500 ease-out">
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-20 hidden md:block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full"><Check size={16} className="text-green-600" /></div>
                      <span className="text-sm font-medium">Project Launched</span>
                    </div>
                  </motion.div>

                  {/* Main Mockup */}
                  <div className="w-full h-full bg-gray-50 rounded-t-2xl border border-gray-200 shadow-xl overflow-hidden transform rotate-x-[10deg] group-hover:rotate-x-[0deg] transition-all duration-700 origin-bottom">
                     <div className="h-8 bg-white border-b border-gray-100 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                     </div>
                     <div className="p-6 space-y-4">
                        <div className="flex gap-4">
                            <div className="w-1/4 h-32 bg-white rounded-xl shadow-sm"></div>
                            <div className="w-1/4 h-32 bg-white rounded-xl shadow-sm"></div>
                            <div className="w-1/2 h-32 bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-2"></div>
                                <div className="h-2 w-1/2 bg-blue-200 rounded"></div>
                            </div>
                        </div>
                        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                        <div className="space-y-2">
                             {[1,2,3].map(i => (
                                 <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                                     <div className="w-4 h-4 rounded border border-gray-300"></div>
                                     <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                                 </div>
                             ))}
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Bottom Half */}
              <div className="bg-gray-50/50 backdrop-blur border-t border-gray-100 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex gap-6 text-sm text-gray-600 font-medium">
                    <div className="flex items-center gap-2"><Clock size={16} /> Smart Scheduling</div>
                    <div className="flex items-center gap-2"><Users size={16} /> Team Collaboration</div>
                    <div className="flex items-center gap-2"><Smartphone size={16} /> Cross-Platform</div>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition flex items-center gap-2 group-hover:shadow-lg">
                        Explore Stride <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-xs text-gray-400">Available on iOS, Android, Web</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Coming Soon Cards */}
          
          {/* Card 1 - Project Phoenix */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-black rounded-[2rem] overflow-hidden min-h-[300px] flex flex-col justify-between p-8"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
             {/* Frosted Effect */}
             <div className="absolute inset-0 backdrop-blur-3xl opacity-50 bg-blue-900/10"></div>
             
             <div className="relative z-10">
                 <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-4 border border-white/10 text-white">
                    <Layers size={24} />
                 </div>
                 <span className="text-blue-400 text-xs font-bold tracking-wider uppercase mb-2 block">Coming Soon</span>
                 <h3 className="text-2xl font-bold text-white mb-1">Project Phoenix</h3>
                 <p className="text-gray-400 text-sm">Advanced project portfolio management.</p>
             </div>
             
             <div className="relative z-10 flex justify-end">
                <span className="text-white/50 text-xs border border-white/20 px-3 py-1 rounded-full">Late 2024</span>
             </div>

             {/* Mysterious Glow */}
             <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          </motion.div>

          {/* Card 3 - Mystery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-gray-50 rounded-[2rem] border border-dashed border-gray-300 flex items-center justify-center min-h-[300px] hover:bg-gray-100 transition-colors"
          >
             <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <CircleHelp size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-400">What's Next?</h3>
                <p className="text-xs text-gray-400 mt-2">We are just getting started.</p>
             </div>
          </motion.div>
          
           {/* Card 2 - Project Atlas (Wide) */}
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-3 lg:col-span-3 relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-[2rem] p-10 overflow-hidden flex items-center"
          >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">In Development</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">Project Atlas</h3>
                      <p className="text-gray-400 max-w-md">Reimagining how teams share knowledge. A central brain for your entire organization.</p>
                  </div>
                  <div className="flex gap-4">
                       <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center text-white/50">
                           <LayoutDashboard size={24} />
                       </div>
                       <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center text-white/50">
                           <Cloud size={24} />
                       </div>
                       <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center text-white/50">
                           <Lock size={24} />
                       </div>
                  </div>
              </div>
          </motion.div>

        </div>
      </section>

      {/* 5. Innovation Lab - Interactive Experience */}
      <section className="bg-black text-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Innovation in Every Detail</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">We don't just build software. We craft experiences that feel like magic.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { title: "Design", icon: <Sparkles className="text-purple-400" />, desc: "Pixel-perfect UI that adapts to your workflow.", delay: 0 },
               { title: "Performance", icon: <Zap className="text-yellow-400" />, desc: "Engineered for speed with <100ms response times.", delay: 0.2 },
               { title: "Integration", icon: <Cpu className="text-blue-400" />, desc: "Seamlessly connects with your favorite tools.", delay: 0.4 }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: item.delay, duration: 0.6 }}
                 className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
               >
                 <div className="mb-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    {item.icon}
                 </div>
                 <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                 <p className="text-gray-400 leading-relaxed">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 6. Comparison Matrix */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Tool</h2>
           </div>
           
           <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-4 p-6 border-b border-gray-100 bg-gray-50/50">
                 <div className="col-span-1 font-semibold text-gray-400 text-sm uppercase tracking-wider">Features</div>
                 <div className="col-span-1 text-center font-bold text-black text-lg">Stride</div>
                 <div className="col-span-1 text-center font-bold text-gray-400">Phoenix</div>
                 <div className="col-span-1 text-center font-bold text-gray-400">Atlas</div>
              </div>
              {[
                { label: "Platform", v1: "All Devices", v2: "Web Only", v3: "Desktop" },
                { label: "Team Size", v1: "Unlimited", v2: "Up to 50", v3: "Enterprise" },
                { label: "Offline Mode", v1: true, v2: false, v3: true },
                { label: "API Access", v1: true, v2: true, v3: true },
                { label: "24/7 Support", v1: true, v2: false, v3: true },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <div className="col-span-1 font-medium text-gray-600">{row.label}</div>
                   <div className="col-span-1 text-center flex justify-center text-black font-medium">
                     {row.v1 === true ? <Check size={20} className="text-green-500" /> : row.v1}
                   </div>
                   <div className="col-span-1 text-center flex justify-center text-gray-400">
                     {row.v2 === true ? <Check size={20} /> : row.v2 === false ? "-" : row.v2}
                   </div>
                   <div className="col-span-1 text-center flex justify-center text-gray-400">
                     {row.v3 === true ? <Check size={20} /> : row.v3}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 7. Technology Stack */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5" 
             style={{ 
               backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }}>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
                <h2 className="text-4xl font-bold mb-6">Built with Excellence</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Our infrastructure is designed for reliability, security, and scale. We utilize cutting-edge technologies to ensure your data is safe and always accessible.
                </p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">99.99% Uptime</div>
                    <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">SOC2 Certified</div>
                </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <Shield className="text-black" />
                    <span className="font-bold">End-to-End Encrypted</span>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <Globe className="text-black" />
                    <span className="font-bold">Edge Network</span>
                 </div>
            </div>
        </div>
      </section>

      {/* 8. Timeline Section - The Journey */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12">
              <h2 className="text-3xl font-bold">The Journey</h2>
          </div>
          <div className="flex overflow-x-auto pb-12 px-6 gap-8 snap-x">
             {[
               { year: "2023", title: "Inception", desc: "The idea of Smart Productivity was born." },
               { year: "2024 Q1", title: "Stride Beta", desc: "Private beta launch to 10,000 users." },
               { year: "2024 Q3", title: "Global Launch", desc: "Stride is now available worldwide." },
               { year: "2025", title: "Expansion", desc: "Project Phoenix and Atlas enter alpha." },
               { year: "Future", title: "Beyond", desc: "Building the operating system for work." }
             ].map((item, i) => (
                <div key={i} className="flex-none w-80 snap-center">
                   <div className="flex items-center mb-4">
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                      <div className="h-0.5 bg-white/20 w-full"></div>
                   </div>
                   <h4 className="text-blue-400 font-bold mb-2">{item.year}</h4>
                   <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                   <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
             ))}
          </div>
      </section>

      {/* 9. CTA */}
      <section className="bg-black py-32 text-center px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Ready to elevate<br/>your productivity?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                    Start with Stride
                 </button>
                 <button className="border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                    Contact Sales
                 </button>
            </div>
          </div>
      </section>

    </div>
  );
};

export default ProductsPage;