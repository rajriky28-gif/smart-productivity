import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { 
  Check, Clock, Hammer, Rocket, MessageSquare, ThumbsUp, 
  AlertTriangle, X, ChartColumn, Users, Calendar, ArrowRight,
  Zap, ChevronDown, ChevronUp, Mail, Activity, Eye, Code,
  Smartphone, Monitor, Cloud, Lock
} from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionSection = motion.section as any;

// --- SHARED UTILS ---

const LivePulse = () => (
  <span className="relative flex h-2 w-2 ml-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
  </span>
);

const NumberTicker = ({ value }: { value: number }) => {
    return <span>{value.toLocaleString()}</span>;
};

// --- SECTION 1: HEADER ---

const Header = () => {
  return (
    <section className="h-[60vh] flex flex-col items-center justify-center bg-white relative">
      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-6"
      >
        <h1 className="text-5xl md:text-8xl font-black text-black mb-6 tracking-tight">Roadmap</h1>
        <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto">
          Where we're going. And how we're getting there.
        </p>
      </MotionDiv>
      
      <div className="absolute top-24 right-6 md:right-12 text-right hidden md:block">
        <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Status</div>
        <div className="flex items-center justify-end gap-2 text-sm font-bold text-green-600">
           Live Updates <LivePulse />
        </div>
        <div className="text-xs text-gray-400 mt-1">v2.4</div>
      </div>
    </section>
  );
};

// --- SECTION 2: DASHBOARD ---

interface DashboardCardProps {
  title: string;
  accent: string;
  delay: number;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, accent, children, delay }) => (
  <MotionDiv 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={`bg-white/50 backdrop-blur-md border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${accent}-500/5 rounded-full blur-3xl group-hover:bg-${accent}-500/10 transition-colors`}></div>
    <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        {title}
        <div className={`w-2 h-2 rounded-full bg-${accent}-500`}></div>
    </h3>
    {children}
  </MotionDiv>
);

const Dashboard = () => {
  const [votes, setVotes] = useState(15203);
  
  // Simulate live voting
  useEffect(() => {
    const interval = setInterval(() => {
        if (Math.random() > 0.7) setVotes(v => v + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 mb-32 -mt-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Building Now" accent="blue" delay={0.2}>
            <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Sprint 47</span>
                    <span>Dec 16-29</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <MotionDiv 
                        initial={{ width: 0 }}
                        animate={{ width: "67%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-blue-500 rounded-full"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                        ))}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">67%</span>
                </div>
            </div>
        </DashboardCard>

        <DashboardCard title="Just Shipped" accent="green" delay={0.3}>
             <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full w-fit text-sm">
                    <Rocket size={14} /> v2.4 Live
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2"><Check size={14} /> New widget system</li>
                    <li className="flex items-center gap-2"><Check size={14} /> Focus mode v2</li>
                    <li className="flex items-center gap-2"><Check size={14} /> 3x Faster sync</li>
                </ul>
                <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                    12,847 downloads in 3 days
                </div>
             </div>
        </DashboardCard>

        <DashboardCard title="Community" accent="purple" delay={0.4}>
             <div className="space-y-6">
                 <div>
                    <div className="text-4xl font-black text-gray-900 tracking-tight">
                        <NumberTicker value={votes} />
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest mt-1">Total Votes</div>
                 </div>
                 <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                     <span className="text-xs font-bold text-purple-600 uppercase">Top Request</span>
                     <div className="font-bold text-gray-900 mt-1">iOS Version</div>
                     <div className="text-xs text-gray-500 mt-1">3,421 votes • In Progress</div>
                 </div>
             </div>
        </DashboardCard>
      </div>
    </section>
  );
};

// --- SECTION 3: 3D TIMELINE ---

const colorMap: Record<string, { bg: string, border: string, text: string, fill: string, glow: string, bgLight: string, shadow: string }> = {
    blue: { 
        bg: 'bg-blue-50', 
        border: 'border-blue-200', 
        text: 'text-blue-600', 
        fill: 'bg-blue-500', 
        glow: 'shadow-blue-500/50', 
        bgLight: 'bg-blue-500/10',
        shadow: 'bg-blue-500/20'
    },
    purple: { 
        bg: 'bg-purple-50', 
        border: 'border-purple-200', 
        text: 'text-purple-600', 
        fill: 'bg-purple-500', 
        glow: 'shadow-purple-500/50', 
        bgLight: 'bg-purple-500/10',
        shadow: 'bg-purple-500/20'
    },
    orange: { 
        bg: 'bg-orange-50', 
        border: 'border-orange-200', 
        text: 'text-orange-600', 
        fill: 'bg-orange-500', 
        glow: 'shadow-orange-500/50', 
        bgLight: 'bg-orange-500/10',
        shadow: 'bg-orange-500/20'
    },
    teal: { 
        bg: 'bg-teal-50', 
        border: 'border-teal-200', 
        text: 'text-teal-600', 
        fill: 'bg-teal-500', 
        glow: 'shadow-teal-500/50', 
        bgLight: 'bg-teal-500/10',
        shadow: 'bg-teal-500/20'
    },
    green: { 
        bg: 'bg-green-50', 
        border: 'border-green-200', 
        text: 'text-green-600', 
        fill: 'bg-green-500', 
        glow: 'shadow-green-500/50', 
        bgLight: 'bg-green-500/10',
        shadow: 'bg-green-500/20'
    },
};

const FeaturePillar = ({ height, color, title, status, progress }: any) => {
    const theme = colorMap[color] || colorMap.blue;

    return (
        <div className="group relative flex flex-col items-center mx-1 md:mx-6 cursor-pointer flex-shrink-0">
             {/* Hover info card - hidden on mobile touch to avoid covering content */}
             <div className="hidden md:block absolute bottom-[calc(100%+1.5rem)] w-48 bg-gray-900 text-white p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-50 pointer-events-none scale-95 group-hover:scale-100 origin-bottom border border-gray-800">
                 <div className="flex justify-between items-center mb-2">
                    <span className={`text-[10px] font-bold uppercase ${theme.text} bg-white/10 px-2 py-0.5 rounded`}>{status}</span>
                    <span className="text-xs font-mono text-gray-400">{progress}%</span>
                 </div>
                 <div className="font-bold text-base mb-2">{title}</div>
                 <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                     <MotionDiv 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        className={`h-full ${theme.fill}`}
                     />
                 </div>
                 {/* Arrow */}
                 <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-r border-b border-gray-800 rotate-45"></div>
             </div>

             {/* The Pillar */}
             <div className="relative group-hover:-translate-y-2 md:group-hover:-translate-y-4 transition-transform duration-500 ease-out">
                 <div 
                    className="relative w-20 md:w-24 rounded-2xl bg-white/40 border-2 border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden backdrop-blur-xl"
                    style={{ height: `${height}px` }}
                 >
                     {/* Inner Pillar Background */}
                     <div className={`absolute inset-0 ${theme.bgLight} opacity-30`}></div>
                     
                     {/* The Fill */}
                     <MotionDiv 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${progress}%` }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0, delay: 0.2 }}
                        className={`absolute bottom-0 left-0 right-0 ${theme.fill} shadow-[0_0_30px_rgba(0,0,0,0.1)]`}
                     >
                        {/* Top highlight line for 3D effect */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/60"></div>
                        {/* Gradient overlay on fill */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                     </MotionDiv>
                 </div>
                 
                 {/* Shadow Base */}
                 <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-3 ${theme.shadow} blur-md rounded-[100%] group-hover:w-16 group-hover:blur-lg transition-all duration-500 opacity-60`}></div>
             </div>

             {/* Label below */}
             <div className="mt-6 text-center group-hover:transform group-hover:translate-y-1 transition-transform">
                 <div className="font-bold text-gray-800 text-xs md:text-sm whitespace-nowrap">{title}</div>
                 <div className="text-[9px] md:text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{status}</div>
             </div>
        </div>
    )
}

const RoadmapBlock = ({ height, icon: Icon, title, date, status, color = "blue", delay = 0 }: any) => {
    return (
        <MotionDiv 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className={`
                relative flex-shrink-0 group cursor-pointer
                w-32 md:w-48
                rounded-t-2xl border border-white/50
                bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-md
                shadow-lg hover:shadow-xl hover:bg-white/90 transition-all
                flex flex-col items-center justify-end p-4 text-center
                snap-center
            `}
            style={{ height: height }}
        >
             {/* Content */}
             <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <Icon size={24} className={`text-${color}-600 mb-2 mx-auto`} />
                <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight">{title}</h3>
                <p className="text-[10px] md:text-xs text-gray-500 font-mono mt-1 uppercase">{date}</p>
             </div>
             
             {/* Status Badge */}
             {status && (
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`bg-${color}-100 text-${color}-700 border border-${color}-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap`}>
                        {status}
                    </span>
                 </div>
             )}

             {/* Bottom Highlight */}
             <div className={`absolute bottom-0 left-0 right-0 h-1 bg-${color}-500 opacity-50`}></div>
        </MotionDiv>
    )
}

const TimelineStage = ({ title, subtitle, color, children, isFuture = false }: any) => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center relative py-20">
            {/* Text Header */}
            <div className={`text-center mb-16 relative z-10 px-4 ${isFuture ? 'text-white' : 'text-gray-900'}`}>
                <MotionDiv 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{title}</h2>
                    <p className={`text-lg md:text-xl ${isFuture ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
                </MotionDiv>
            </div>
            
            {/* Platform Base */}
            <div className="w-full relative z-0">
                 {/* Background Glow */}
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] md:w-[600px] h-[300px] bg-${color}-500/20 rounded-[100%] blur-3xl opacity-50 pointer-events-none`}></div>
                 
                 {/* Scrollable Container for Mobile */}
                 <div className="flex items-end gap-4 md:gap-8 overflow-x-auto px-6 pb-12 pt-8 snap-x no-scrollbar w-full justify-start md:justify-center">
                     {children}
                 </div>
            </div>
        </div>
    )
}

const SpatialTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const background = useTransform(
      scrollYProgress,
      [0, 0.4, 0.7, 1],
      ["#f8fafc", "#eef2ff", "#1e1b4b", "#000000"]
  );

  return (
    <MotionSection 
        ref={containerRef} 
        style={{ backgroundColor: background }}
        className="relative overflow-hidden"
    >
        {/* Stage 1: NOW */}
        <TimelineStage title="NOW" subtitle="December 2024" color="green">
             <FeaturePillar height={240} color="blue" title="Cloud Sync" status="Finishing" progress={70} />
             <FeaturePillar height={180} color="purple" title="iOS Beta" status="Delayed ⚠️" progress={45} />
             <FeaturePillar height={150} color="orange" title="Subtasks" status="Dev" progress={40} />
             <FeaturePillar height={100} color="teal" title="Recurring v2" status="Started" progress={25} />
        </TimelineStage>

        {/* Bridge Effect */}
        <div className="h-32 w-px bg-gradient-to-b from-gray-300 to-transparent mx-auto"></div>

        {/* Stage 2: Q1 2025 */}
        <TimelineStage title="Q1 2025" subtitle="Expansion" color="blue">
             <RoadmapBlock 
                height={260} 
                icon={Cloud} 
                title="Cloud Sync" 
                date="Jan 15" 
                status="High Confidence" 
                color="blue"
                delay={0}
             />
             <RoadmapBlock 
                height={200} 
                icon={Smartphone} 
                title="iOS Beta" 
                date="Feb 28" 
                color="blue"
                delay={0.1}
             />
             <RoadmapBlock 
                height={160} 
                icon={Zap} 
                title="Recurring Tasks" 
                date="Mar 15" 
                color="blue"
                delay={0.2}
             />
        </TimelineStage>

        {/* Stage 3: Q2 2025 */}
        <TimelineStage title="Q2 2025" subtitle="The Ecosystem" color="purple" isFuture={true}>
             <RoadmapBlock 
                height={220} 
                icon={Users} 
                title="Collaboration" 
                date="April" 
                status="Major Update" 
                color="purple"
                delay={0}
             />
             <RoadmapBlock 
                height={160} 
                icon={Calendar} 
                title="Cal Sync" 
                date="May" 
                color="purple"
                delay={0.1}
             />
             <RoadmapBlock 
                height={190} 
                icon={Smartphone} 
                title="Wear OS" 
                date="June" 
                color="purple"
                delay={0.2}
             />
        </TimelineStage>

        {/* Stage 4: FUTURE */}
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
            <div className="max-w-3xl space-y-8">
                 <h2 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">The Horizon</h2>
                 <div className="flex flex-col sm:flex-row justify-center gap-8 opacity-50">
                     <div className="border border-white/10 p-6 rounded-2xl w-full sm:w-48">
                         <Monitor size={32} className="mx-auto mb-4" />
                         <div className="font-bold">Desktop Apps</div>
                         <div className="text-xs text-gray-500 mt-2">Concept</div>
                     </div>
                     <div className="border border-white/10 p-6 rounded-2xl w-full sm:w-48">
                         <Zap size={32} className="mx-auto mb-4" />
                         <div className="font-bold">AI Suggestions</div>
                         <div className="text-xs text-gray-500 mt-2">Ethical Review</div>
                     </div>
                 </div>
                 <p className="text-gray-500 text-xl pt-12">
                    "The future isn't written. You help us write it."
                 </p>
            </div>
        </div>

    </MotionSection>
  );
};

// --- SECTION 4: VOTING ---

const FeatureRequest = ({ title, votes, status }: any) => (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl flex justify-between items-center hover:border-black transition-colors group">
        <div>
            <div className="font-bold text-lg text-gray-900 mb-1">{title}</div>
            <div className="text-xs font-medium px-2 py-1 bg-gray-100 rounded inline-block text-gray-600">{status}</div>
        </div>
        <button className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform">
            <ThumbsUp size={24} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm font-bold text-gray-500 group-hover:text-blue-600">{votes}</span>
        </button>
    </div>
);

const VotingSection = () => {
    return (
        <section className="py-32 bg-yellow-50 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-black">You Shape What We Build</h2>
                    <p className="text-gray-600">Every vote matters. Top requests get prioritized.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FeatureRequest title="iPad Native App" votes="3,421" status="Planned Q1" />
                    <FeatureRequest title="Pomodoro Timer" votes="2,100" status="Under Review" />
                    <FeatureRequest title="Notion Integration" votes="1,850" status="Collecting Votes" />
                    <FeatureRequest title="Family Sharing Plan" votes="980" status="Under Review" />
                </div>

                <div className="mt-12 text-center">
                    <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                        Submit a Request <ArrowRight size={18} />
                    </button>
                    <p className="text-xs text-gray-400 mt-4">234 total requests • 47 implemented</p>
                </div>
            </div>
        </section>
    );
};

// --- SECTION 5: TRANSPARENCY (Graveyard) ---

const GraveyardItem = ({ title, reason, votes }: any) => (
    <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl opacity-75 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 mb-2 text-gray-400">
            <X size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Not Pursuing</span>
        </div>
        <h3 className="font-bold text-gray-700 mb-2 line-through decoration-gray-400">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{reason}</p>
        <div className="text-xs text-gray-400">{votes} votes declined</div>
    </div>
);

const Graveyard = () => {
    return (
        <section className="py-24 bg-white px-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">The Graveyard</h2>
                    <p className="text-gray-500">Ideas we explored but didn't build. Saying "no" keeps Stride focused.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GraveyardItem 
                        title="Social Feed of Tasks" 
                        reason="Users value privacy over social. Risk of comparison anxiety."
                        votes="423"
                    />
                    <GraveyardItem 
                        title="Gamification / Points" 
                        reason="Can create unhealthy extrinsic motivation. We prefer simple streaks."
                        votes="678"
                    />
                    <GraveyardItem 
                        title="AI Auto-Task Generation" 
                        reason="Tasks should be intentional. Privacy concerns with deep analysis."
                        votes="234"
                    />
                </div>
            </div>
        </section>
    );
};

// --- SECTION 6: METRICS & TEAM ---

const MetricCard = ({ label, value, trend }: any) => (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
        <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">{label}</div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <div className="text-green-500 text-sm flex items-center gap-1"><Activity size={14} /> {trend}</div>
    </div>
);

const MetricsAndTeam = () => {
    return (
        <section className="py-32 bg-black text-white px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* Metrics */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8">By The Numbers</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <MetricCard label="Uptime" value="99.99%" trend="Stable" />
                            <MetricCard label="Bug Fix Time" value="3.2 days" trend="Improving" />
                            <MetricCard label="Team Size" value="8 Humans" trend="Hiring +2" />
                            <MetricCard label="Code Quality" value="A+" trend="96% Coverage" />
                        </div>
                        <p className="text-gray-500 text-sm mt-8 italic">"These numbers keep us honest."</p>
                    </div>

                    {/* Team */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8">Built by Humans</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">SC</div>
                                <div>
                                    <div className="font-bold">Sarah Chen</div>
                                    <div className="text-sm text-gray-400">Lead iOS • Currently fixing layout bug</div>
                                </div>
                                <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">AR</div>
                                <div>
                                    <div className="font-bold">Alex Rivera</div>
                                    <div className="text-sm text-gray-400">Android • Working on Cloud Sync</div>
                                </div>
                                <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                             <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">JK</div>
                                <div>
                                    <div className="font-bold">Jordan Kim</div>
                                    <div className="text-sm text-gray-400">Design • Prototyping Q3 concepts</div>
                                </div>
                                <div className="ml-auto w-2 h-2 rounded-full bg-yellow-500"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

// --- SECTION 7: SIDE PANEL (Floating) ---

const LiveActivityPanel = () => {
    const [activities, setActivities] = useState([
        { msg: "Sarah pushed code to iOS branch", time: "2m ago", icon: <Code size={14} /> },
        { msg: "Cloud sync reached 75%", time: "15m ago", icon: <ChartColumn size={14} /> },
        { msg: "47 new votes on 'Dark Mode'", time: "23m ago", icon: <ThumbsUp size={14} /> },
    ]);

    return (
        <MotionDiv 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2 }}
            className="fixed bottom-6 right-6 z-40 hidden lg:block"
        >
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-4 w-72">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Live Activity</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </div>
                <div className="space-y-3">
                    {activities.map((a, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <div className="mt-1 text-gray-400">{a.icon}</div>
                            <div>
                                <div className="text-xs font-medium text-gray-800">{a.msg}</div>
                                <div className="text-[10px] text-gray-400">{a.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MotionDiv>
    );
};

const RoadmapPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <Header />
            <Dashboard />
            <SpatialTimeline />
            <VotingSection />
            <Graveyard />
            <MetricsAndTeam />
            <LiveActivityPanel />
        </div>
    );
};

export default RoadmapPage;