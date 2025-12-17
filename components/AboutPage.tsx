import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Diamond, Zap, Eye, Heart, Globe, Clock, Check, Users, Mail, MessageCircle, MapPin } from 'lucide-react';

// --- 1. Manifesto Section ---
const Manifesto = () => {
  const lines = [
    "We believe productivity isn't about doing more.",
    "It's about doing what matters.",
    "Not about speed.",
    "But about purpose.",
    "Not about tools that complicate.",
    "But tools that clarify.",
    "This is why we exist."
  ];

  const [displayedLines, setDisplayedLines] = useState<string[]>(lines.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isResetting) {
        const resetTimeout = setTimeout(() => {
            setDisplayedLines(lines.map(() => ""));
            setCurrentLine(0);
            setCharIndex(0);
            setIsResetting(false);
        }, 3000); // Wait 3 seconds before restarting the loop
        return () => clearTimeout(resetTimeout);
    }

    const typeTimeout = setTimeout(() => {
        if (currentLine < lines.length) {
            const fullLine = lines[currentLine];
            
            if (charIndex < fullLine.length) {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    newLines[currentLine] = fullLine.substring(0, charIndex + 1);
                    return newLines;
                });
                setCharIndex(prev => prev + 1);
            } else {
                // Line finished
                if (currentLine < lines.length - 1) {
                     setTimeout(() => {
                         setCurrentLine(prev => prev + 1);
                         setCharIndex(0);
                     }, 300);
                } else {
                    // All lines finished
                    setIsResetting(true);
                }
            }
        }
    }, 40); // Typing speed per character

    return () => clearTimeout(typeTimeout);
  }, [charIndex, currentLine, isResetting, lines]);

  return (
    <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 pt-32 relative overflow-hidden z-20">
      {/* Background Texture - Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* Vignette for focus */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12 flex flex-col justify-center min-h-[50vh] relative z-10 pb-40">
        {lines.map((line, i) => (
          <div key={i} className="min-h-[1.5em] md:min-h-[3.5rem]"> 
            <p
                className={`text-2xl md:text-5xl font-serif font-light leading-tight transition-all duration-300
                ${i === lines.length - 1 ? 'text-white font-bold' : 'text-gray-400'}
                ${i > currentLine ? 'opacity-0' : 'opacity-100'}
                `}
            >
                {displayedLines[i]}
                {i === currentLine && !isResetting && (
                    <span className="inline-block w-0.5 h-[1em] bg-blue-500 ml-1 animate-pulse align-middle" />
                )}
            </p>
          </div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Scroll to begin</span>
        <motion.div 
            animate={{ height: [40, 60, 40], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px bg-gradient-to-b from-gray-500 to-transparent"
        ></motion.div>
      </motion.div>
    </section>
  );
};

// --- 2. Origin Story (Horizontal Scroll) ---
const OriginStory = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.33%"]); // Move 5/6ths for 6 slides

  const pages = [
    { year: "2023", title: "Overwhelmed", text: "We were drowning in tools that made us less productive.", visual: "bg-red-50" },
    { year: "The Question", title: "What if?", text: "What if we started over? Simple is harder than complex.", visual: "bg-gray-50" },
    { year: "Vision", title: "Tools that think", text: "A sketch on a napkin. A lightbulb moment.", visual: "bg-yellow-50" },
    { year: "Feb 2024", title: "Stride Born", text: "Version 0.1. It was ugly, but it worked.", visual: "bg-blue-50" },
    { year: "Growth", title: "500,000 Users", text: "From a garage to a global community.", visual: "bg-indigo-50" },
    { year: "Today", title: "Just Beginning", text: "We are building the operating system for work.", visual: "bg-purple-50" },
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#fdfbf7]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {pages.map((page, i) => (
            <div key={i} className={`h-screen w-screen flex-shrink-0 flex items-center justify-center p-8 ${page.visual} border-r border-gray-100`}>
              <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                   <span className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 inline-block">{page.year}</span>
                   <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-4">{page.title}</h2>
                   <p className="text-xl md:text-2xl text-gray-600 font-serif italic">{page.text}</p>
                </div>
                <div className="aspect-square bg-white rounded-2xl shadow-xl p-8 transform rotate-3 flex items-center justify-center border border-gray-100/50">
                    <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- 3. Mission ---
const Mission = () => {
  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">Our Mission</h2>
        <h3 className="text-4xl md:text-6xl font-medium leading-tight text-black">
          To <span className="text-blue-600 font-bold">empower</span> individuals and <span className="font-serif italic text-gray-500">teams</span> to achieve <span className="bg-black text-white px-2">meaningful</span> work without complexity.
        </h3>
      </div>
    </section>
  );
};

// --- 4. Values (3D Cards) ---
const ValueCard: React.FC<{ icon: any; title: string; desc: string }> = ({ icon, title, desc }) => {
  return (
    <div className="group h-64 w-full perspective-[1000px]">
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm [backface-visibility:hidden]">
          <div className="mb-4 text-gray-900">{icon}</div>
          <h3 className="text-xl font-bold text-black">{title}</h3>
        </div>
        <div className="absolute inset-0 bg-black rounded-2xl p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-white text-lg font-medium">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const Values = () => {
  const values = [
    { icon: <Zap size={32} />, title: "Simplicity", desc: "Less is more. If it's not essential, remove it." },
    { icon: <Shield size={32} />, title: "Privacy", desc: "Your data is yours. Always encrypted. Never sold." },
    { icon: <Diamond size={32} />, title: "Quality", desc: "We ship when it's right, not when it's rushed." },
    { icon: <Heart size={32} />, title: "Empathy", desc: "Built for humans, by humans." },
    { icon: <Eye size={32} />, title: "Transparency", desc: "Open roadmap. Clear pricing. Honest talk." },
    { icon: <Globe size={32} />, title: "Innovation", desc: "We don't follow trends. We set them." },
  ];

  return (
    <section className="py-32 bg-gray-50 px-6">
       <div className="max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What We Stand For</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => <ValueCard key={i} icon={v.icon} title={v.title} desc={v.desc} />)}
         </div>
       </div>
    </section>
  );
};

// --- 5. Team (Chaos Layout) ---
const TeamMember = ({ name, role, fact, rotation, offset }: { name: string, role: string, fact: string, rotation: number, offset: string }) => {
  return (
    <motion.div 
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
      style={{ rotate: rotation }}
      className={`absolute ${offset} bg-white p-3 pb-8 shadow-xl w-64 transform transition-all cursor-grab active:cursor-grabbing`}
    >
      <div className="w-full aspect-square bg-gray-200 mb-4 grayscale hover:grayscale-0 transition-all duration-300">
         {/* Placeholder for team photo */}
         <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <Users size={48} />
         </div>
      </div>
      <h4 className="font-bold text-lg text-black">{name}</h4>
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{role}</p>
      <p className="text-sm font-serif italic text-gray-600 border-t border-gray-100 pt-2">"{fact}"</p>
    </motion.div>
  );
};

const Team = () => {
  return (
    <section className="py-32 bg-[#e5e5e5] overflow-hidden relative min-h-[900px] flex flex-col items-center">
       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
       
       <div className="text-center relative z-0 mt-20 pointer-events-none">
          <h2 className="text-5xl font-black text-gray-900 bg-white/50 backdrop-blur px-8 py-4 inline-block rounded-full">The Humans</h2>
       </div>

       <div className="absolute inset-0 max-w-7xl mx-auto top-64">
          {/* Simulated randomized layout - Pushed down to avoid title overlap */}
          <TeamMember name="Sarah J." role="Founder & CEO" fact="Drinks 8 espressos a day" rotation={-5} offset="top-0 left-[10%]" />
          <TeamMember name="David K." role="CTO" fact="Dreams in TypeScript" rotation={3} offset="top-20 right-[15%]" />
          <TeamMember name="Elena R." role="Head of Design" fact="Hates sharp corners" rotation={-8} offset="bottom-64 left-[20%]" />
          <TeamMember name="Michael T." role="Lead Engineer" fact="Still uses Vim" rotation={6} offset="bottom-40 right-[25%]" />
          <TeamMember name="You?" role="Future Teammate" fact="We're hiring!" rotation={2} offset="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
       </div>
    </section>
  );
};

// --- 6. Impact Stats ---
const StatItem = ({ value, label }: { value: string, label: string }) => {
    return (
        <div className="text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2"
            >
                {value}
            </motion.div>
            <div className="text-gray-400 font-medium uppercase tracking-widest">{label}</div>
        </div>
    )
}

const Impact = () => {
  return (
    <section className="py-32 bg-gray-900 text-white">
       <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
             <StatItem value="500K+" label="Active Users" />
             <StatItem value="2.5M+" label="Tasks Completed" />
             <StatItem value="99.9%" label="Uptime" />
          </div>
       </div>
    </section>
  );
};

// --- 7. Timeline (Vertical) ---
const TimelineItem = ({ year, title, desc, status }: { year: string, title: string, desc: string, status: 'past' | 'present' | 'future' }) => {
    const isPresent = status === 'present';
    const isFuture = status === 'future';
    
    return (
        <div className={`relative pl-12 pb-12 border-l-2 ${isPresent ? 'border-blue-500' : isFuture ? 'border-gray-800' : 'border-gray-700'}`}>
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${isPresent ? 'bg-blue-500 border-blue-500 animate-pulse' : isFuture ? 'bg-black border-gray-700' : 'bg-gray-700 border-gray-700'}`}></div>
            <div className={`text-sm font-bold mb-1 ${isPresent ? 'text-blue-400' : 'text-gray-500'}`}>{year}</div>
            <h3 className={`text-2xl font-bold mb-2 ${isFuture ? 'text-gray-500' : 'text-white'}`}>{title}</h3>
            <p className="text-gray-400 max-w-md">{desc}</p>
        </div>
    )
}

const Timeline = () => {
    return (
        <section className="py-32 bg-black text-white px-6">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold mb-16 text-center">The Roadmap</h2>
                <div className="ml-4 md:ml-0">
                    <TimelineItem year="2024" title="Stride Launch" desc="First public release. Core features established." status="past" />
                    <TimelineItem year="Q1 2025" title="Global Scale" desc="Reaching 500k users. You are here." status="present" />
                    <TimelineItem year="Q2 2025" title="Project Phoenix" desc="Advanced portfolio management for enterprise." status="future" />
                    <TimelineItem year="2026+" title="The Operating System" desc="Building the future of work." status="future" />
                </div>
            </div>
        </section>
    )
}

// --- 8. Transparency (No BS) ---
const Transparency = () => {
    return (
        <section className="flex flex-col md:flex-row bg-white">
            <div className="flex-1 bg-black text-white p-12 md:p-24 border-b md:border-b-0 md:border-r border-gray-800">
                <h3 className="text-3xl font-bold mb-8">What We're Good At</h3>
                <ul className="space-y-4 text-gray-400">
                    <li className="flex items-center gap-3"><Check className="text-green-500" /> Ultra-fast interactions</li>
                    <li className="flex items-center gap-3"><Check className="text-green-500" /> Beautiful, distraction-free UI</li>
                    <li className="flex items-center gap-3"><Check className="text-green-500" /> Reliable syncing engine</li>
                </ul>
            </div>
            <div className="flex-1 bg-gray-50 text-black p-12 md:p-24">
                <h3 className="text-3xl font-bold mb-8">What We're Working On</h3>
                <ul className="space-y-4 text-gray-600">
                    <li className="flex items-center gap-3"><Clock className="text-yellow-500" /> Better offline-first support</li>
                    <li className="flex items-center gap-3"><Clock className="text-yellow-500" /> Deeper integrations with legacy tools</li>
                    <li className="flex items-center gap-3"><Clock className="text-yellow-500" /> Mobile widget customization</li>
                </ul>
            </div>
        </section>
    )
}

// --- 9. CTA ---
const FinalCTA = ({ onNavigate }: { onNavigate?: (view: string) => void }) => {
    return (
        <section className="h-screen bg-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-3xl"
            >
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                    Build the future<br/>of productivity.
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => onNavigate?.('products')} className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                        Try Stride Free
                    </button>
                    <button className="border border-white/30 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                        See Open Positions
                    </button>
                </div>
            </motion.div>
        </section>
    )
}

// --- MAIN COMPONENT ---
interface AboutPageProps {
    onNavigate?: (view: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <Manifesto />
            <OriginStory />
            <Mission />
            <Values />
            <Team />
            <div className="bg-white py-20 px-6">
                <h2 className="text-4xl font-bold text-center mb-16">Life at Smart Productivity</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    
                    {/* Card 1: Collaboration */}
                    <div className="col-span-2 row-span-2 bg-gray-100 rounded-2xl p-8 flex items-end relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>
                        <div className="relative z-10 text-white">
                            <h3 className="font-bold text-2xl mb-2">We debate. We iterate. We ship.</h3>
                            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                                Collaboration is at the heart of everything we do.
                            </p>
                        </div>
                    </div>
                    
                    {/* Card 2: Deep Focus */}
                    <div className="bg-gray-100 rounded-2xl p-6 flex items-end relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="relative z-10 text-white font-bold">Deep Focus</div>
                    </div>
                    
                    {/* Card 3: Async First */}
                    <div className="bg-black text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center font-bold relative overflow-hidden group">
                         <div className="absolute inset-0 bg-gray-900 transform scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full"></div>
                         <div className="relative z-10">
                            <span className="text-2xl mb-2 block">⚡️</span>
                            Async First
                         </div>
                    </div>
                    
                    {/* Card 4: Remote */}
                    <div className="col-span-2 bg-gray-100 rounded-2xl p-8 flex items-end relative overflow-hidden group">
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                         <div className="relative z-10 text-white font-bold text-xl">Remote by default</div>
                    </div>

                </div>
            </div>
            <Impact />
            <Transparency />
            <Timeline />
            <section className="py-32 bg-white text-center">
                 <h2 className="text-3xl font-bold mb-8">Got a question?</h2>
                 <div className="flex justify-center gap-8">
                     <a href="#" className="flex flex-col items-center gap-2 group">
                         <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                             <Mail size={24} />
                         </div>
                         <span className="font-medium text-sm">Email Us</span>
                     </a>
                     <a href="#" className="flex flex-col items-center gap-2 group">
                         <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                             <MessageCircle size={24} />
                         </div>
                         <span className="font-medium text-sm">Support</span>
                     </a>
                     <a href="#" className="flex flex-col items-center gap-2 group">
                         <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                             <MapPin size={24} />
                         </div>
                         <span className="font-medium text-sm">Locations</span>
                     </a>
                 </div>
            </section>
            <FinalCTA onNavigate={onNavigate} />
        </div>
    );
};

export default AboutPage;