import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  MessageCircle, Bug, Lightbulb, Handshake, LifeBuoy, Hand, 
  ArrowRight, X, Send, Paperclip, MapPin, Globe, Check, 
} from 'lucide-react';
import EmailSupportForm from './EmailSupportForm';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

// --- Types ---
type IntentType = 'question' | 'bug' | 'idea' | 'partner' | 'support' | 'hello' | null;

// --- Sub-Component: The Spotlight Entrance ---
const SpotlightEntrance = ({ onComplete }: { onComplete: () => void }) => {
  const [helloText, setHelloText] = useState("Hello");
  const greetings = ["Hello", "Hola", "Bonjour", "Ciao", "こんにちは", "안녕하세요"];
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the spotlight
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cycle greetings
    const interval = setInterval(() => {
      setHelloText(prev => {
        const currentIndex = greetings.indexOf(prev);
        return greetings[(currentIndex + 1) % greetings.length];
      });
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <MotionDiv 
      className="fixed inset-0 z-50 bg-black cursor-none flex items-center justify-center overflow-hidden"
      onClick={onComplete}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 1 }}
    >
      {/* The Reveal Mask */}
      <MotionDiv 
        className="absolute inset-0 bg-white pointer-events-none mix-blend-difference"
        style={{
          maskImage: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, black, transparent)`
          ),
          WebkitMaskImage: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, black, transparent)`
          )
        }}
      />

      <div className="relative z-10 text-center pointer-events-none mix-blend-difference text-white">
        <MotionH1 
          key={helloText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-9xl font-black tracking-tighter"
        >
          {helloText}.
        </MotionH1>
        <MotionP 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-xl font-light tracking-widest uppercase"
        >
            Click to connect
        </MotionP>
      </div>

      {/* Custom Cursor Follower */}
      <MotionDiv 
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-50"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
    </MotionDiv>
  );
};

// --- Sub-Component: Intent Card ---
const IntentCard = ({ 
  title, 
  icon: Icon, 
  color, 
  onClick, 
  delay 
}: { 
  title: string, 
  icon: any, 
  color: string, 
  onClick: () => void,
  delay: number 
}) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 cursor-pointer group hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-${color}-500/20 transition-colors`}></div>
      
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={32} className="text-gray-800" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:translate-x-1 transition-transform">{title}</h3>
      <div className="flex items-center text-gray-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
        Let's talk <ArrowRight size={16} className="ml-1" />
      </div>
    </MotionDiv>
  );
};

// --- Sub-Component: Simulated Form Modal ---
const ContactModal = ({ intent, onClose }: { intent: IntentType, onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (intent === 'support') {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <MotionDiv 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <MotionDiv 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-white w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
                <EmailSupportForm onClose={onClose} />
            </MotionDiv>
        </div>
      );
  }

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
    }, 1500);
  };

  const renderContent = () => {
    if (isSuccess) {
        return (
            <div className="text-center py-20">
                <MotionDiv 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <Check size={48} />
                </MotionDiv>
                <h3 className="text-3xl font-bold mb-4">Message Received!</h3>
                <p className="text-gray-500 mb-8">We've dispatched a carrier pigeon (digital, of course).<br/>Expect a reply shortly.</p>
                <button onClick={onClose} className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
                    Back to Earth
                </button>
            </div>
        )
    }

    switch (intent) {
        case 'bug':
            return (
                <div className="space-y-6">
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
                        <Bug className="text-red-500 mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-red-900">Houston, we have a problem.</h4>
                            <p className="text-sm text-red-700">Don't worry, our exterminators are standing by. Tell us what happened.</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">What broke?</label>
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none">
                            <option>Stride Task Manager</option>
                            <option>Sync Engine</option>
                            <option>Mobile App</option>
                            <option>The Matrix (General Glitch)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Describe the crime scene</label>
                        <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 h-32 focus:ring-2 focus:ring-black outline-none" placeholder="I clicked the button and..."></textarea>
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-black text-white font-bold py-4 rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                        {isSubmitting ? 'Transmitting...' : 'Send Report'} <Send size={18} />
                    </button>
                </div>
            );
        case 'idea':
             return (
                <div className="space-y-6">
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-start gap-3">
                        <Lightbulb className="text-yellow-600 mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-yellow-900">The Idea Lab</h4>
                            <p className="text-sm text-yellow-700">Some of our best features started as user scribbles. What's on your mind?</p>
                        </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <Paperclip className="mx-auto text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-500">Attach a sketch or mockup (optional)</span>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Your Vision</label>
                        <textarea className="w-full bg-white border border-gray-200 rounded-xl p-4 h-40 focus:ring-2 focus:ring-yellow-400 outline-none font-serif text-lg placeholder:italic" placeholder="What if Stride could..."></textarea>
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-black text-white font-bold py-4 rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                        {isSubmitting ? 'Pinning to Board...' : 'Submit Idea'} <Lightbulb size={18} />
                    </button>
                </div>
             );
        case 'hello':
             return (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Sign the Guestbook</h3>
                        <p className="text-gray-500">Leave your mark on our digital wall.</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border border-gray-100 shadow-sm transform rotate-1">
                        <textarea className="w-full bg-transparent border-none p-0 text-xl font-handwriting placeholder:text-gray-400 focus:ring-0 resize-none h-32" placeholder="Just stopping by to say..."></textarea>
                        <div className="flex justify-between items-center mt-4 border-t border-gray-200/50 pt-4">
                            <input type="text" placeholder="- Your Name" className="bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-600 w-1/2" />
                            <div className="text-xs text-gray-400 uppercase tracking-widest">Postcard</div>
                        </div>
                    </div>

                    <button onClick={handleSubmit} className="w-full bg-black text-white font-bold py-4 rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                         {isSubmitting ? 'Posting...' : 'Pin to Wall'} <MapPin size={18} />
                    </button>
                </div>
             )
        default:
            return (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">How can we help?</label>
                        <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 h-40 focus:ring-2 focus:ring-black outline-none" placeholder="Tell us everything..."></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Name</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none" />
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-black text-white font-bold py-4 rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                        {isSubmitting ? 'Sending...' : 'Start Conversation'} <Send size={18} />
                    </button>
                </div>
            );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <MotionDiv 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <MotionDiv 
        initial={{ scale: 0.9, opacity: 0, y: 50 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
        </button>
        
        {!isSuccess && (
            <div className="mb-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step 1 of 2</span>
            </div>
        )}

        {renderContent()}

      </MotionDiv>
    </div>
  );
};

// --- MAIN COMPONENT ---
const ContactPage: React.FC = () => {
  const [showEntrance, setShowEntrance] = useState(true);
  const [selectedIntent, setSelectedIntent] = useState<IntentType>(null);
  
  // Use a ref to track if we've seen the entrance this session (mock session)
  // In a real app, use sessionStorage
  useEffect(() => {
     window.scrollTo(0,0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans relative">
      <AnimatePresence>
        {showEntrance ? <SpotlightEntrance onComplete={() => setShowEntrance(false)} /> : null}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-32">
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">How can we help?</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Choose a path below. We've designed a specific team for every need.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntentCard 
            title="I Have a Question" 
            icon={MessageCircle} 
            color="bg-blue-100" 
            onClick={() => setSelectedIntent('question')}
            delay={0.6}
          />
          <IntentCard 
            title="I Found a Bug" 
            icon={Bug} 
            color="bg-red-100" 
            onClick={() => setSelectedIntent('bug')}
            delay={0.7}
          />
          <IntentCard 
            title="I Have an Idea" 
            icon={Lightbulb} 
            color="bg-yellow-100" 
            onClick={() => setSelectedIntent('idea')}
            delay={0.8}
          />
          <IntentCard 
            title="Let's Work Together" 
            icon={Handshake} 
            color="bg-green-100" 
            onClick={() => setSelectedIntent('partner')}
            delay={0.9}
          />
          <IntentCard 
            title="I Need Support" 
            icon={LifeBuoy} 
            color="bg-indigo-100" 
            onClick={() => setSelectedIntent('support')}
            delay={1.0}
          />
          <IntentCard 
            title="Just Saying Hi" 
            icon={Hand} 
            color="bg-pink-100" 
            onClick={() => setSelectedIntent('hello')}
            delay={1.1}
          />
        </div>

        {/* Global Contact Info (Footer of Page) */}
        <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-32 border-t border-gray-200 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12"
        >
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Globe size={20} />
                    <span className="font-bold">San Francisco HQ</span>
                </div>
                <p className="text-gray-500">548 Market St<br/>San Francisco, CA 94104</p>
            </div>
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <MessageCircle size={20} />
                    <span className="font-bold">Live Chat</span>
                </div>
                <p className="text-gray-500">Available Mon-Fri<br/>9am - 5pm PST</p>
            </div>
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Send size={20} />
                    <span className="font-bold">Email Us</span>
                </div>
                <p className="text-gray-500 hover:text-black cursor-pointer transition-colors" onClick={() => setSelectedIntent('support')}>hello@smartproductivity.com</p>
            </div>
        </MotionDiv>
      </div>

      <AnimatePresence>
        {selectedIntent ? (
          <ContactModal intent={selectedIntent} onClose={() => setSelectedIntent(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;