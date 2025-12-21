import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, Clock, ChevronRight, Filter, Play, Mic, 
  ArrowRight, Mail, Share2, MessageCircle, Bookmark, Heart, 
  X, User, Calendar, Twitter, Linkedin, Facebook, Check
} from 'lucide-react';

// --- TYPES ---

type StoryType = 'article' | 'update' | 'thought' | 'tutorial' | 'video';

interface Story {
  id: string;
  type: StoryType;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  views?: number;
}

// --- MOCK DATA ---

const FEATURED_STORY: Story = {
  id: 'featured-1',
  type: 'article',
  title: 'The Philosophy of Focus: Why We Rebuilt Focus Mode From Scratch',
  excerpt: 'Deep dive into our design decisions, technical challenges, and what we learned building the most requested feature.',
  author: 'Sarah Chen',
  date: 'Dec 15, 2024',
  readTime: '8 min read',
  category: 'Behind the Scenes',
  image: 'https://images.unsplash.com/photo-1499750310159-54f8f0506f1e?auto=format&fit=crop&q=80&w=2000',
  views: 4234
};

const STORIES: Story[] = [
  {
    id: '1',
    type: 'article',
    title: 'Building Stride: From Idea to 500,000 Users',
    excerpt: 'The story of late nights, hard decisions, and what we learned launching our first product.',
    author: 'Alex Rivera',
    date: 'Dec 10, 2024',
    readTime: '15 min read',
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    views: 5432
  },
  {
    id: '2',
    type: 'update',
    title: 'Introducing Widgets: Your Tasks, Always Visible',
    excerpt: 'We shipped the most requested feature. Here\'s how we built it.',
    author: 'Jordan Kim',
    date: 'Dec 15, 2024',
    readTime: '5 min read',
    category: 'Product Update',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800',
    views: 3210
  },
  {
    id: '3',
    type: 'thought',
    title: 'Why Productivity Apps Fail Most People',
    excerpt: 'Spoiler: It\'s not about features. It\'s about psychology.',
    author: 'The Team',
    date: 'Dec 8, 2024',
    readTime: '3 min read',
    category: 'Thoughts',
    views: 2890
  },
  {
    id: '4',
    type: 'tutorial',
    title: '10 Stride Features You Didn\'t Know Existed',
    excerpt: 'Power user tips to maximize your productivity workflow.',
    author: 'Community Team',
    date: 'Dec 5, 2024',
    readTime: '7 min read',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    views: 6123
  },
  {
    id: '5',
    type: 'article',
    title: 'The Art of Async Communication',
    excerpt: 'How our remote team stays aligned without endless meetings.',
    author: 'David K.',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    category: 'Company Culture',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    views: 4100
  },
  {
    id: '6',
    type: 'update',
    title: 'Dark Mode: Designing for the Night',
    excerpt: 'It’s not just inverting colors. It’s about contrast and comfort.',
    author: 'Elena R.',
    date: 'Nov 20, 2024',
    readTime: '6 min read',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    views: 3800
  }
];

// --- COMPONENTS ---

// 1. Article Reader (Full Screen)
const ArticleReader = ({ story, onClose }: { story: Story, onClose: () => void }) => {
    const { scrollYProgress } = useScroll();
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; }
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
        >
            {/* Reading Progress */}
            <motion.div 
                style={{ scaleX: scrollYProgress }}
                className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
            />

            {/* Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center z-40">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-gray-600">
                    <ArrowRight className="rotate-180" size={20} /> <span className="text-sm font-medium">Back to Stories</span>
                </button>
                <div className="flex gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><Share2 size={20} /></button>
                    <button 
                        onClick={() => setIsBookmarked(!isBookmarked)} 
                        className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isBookmarked ? 'text-blue-600 fill-current' : 'text-gray-600'}`}
                    >
                        <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="pt-20 pb-32">
                {/* Hero */}
                <div className="relative h-[60vh] min-h-[400px]">
                    <img src={story.image || "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=2000"} alt={story.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 max-w-4xl mx-auto text-white">
                        <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">{story.category}</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">{story.title}</h1>
                        <div className="flex items-center gap-6 text-sm md:text-base font-medium text-white/90">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.author}`} alt={story.author} />
                                </div>
                                {story.author}
                            </div>
                            <span>•</span>
                            <span>{story.date}</span>
                            <span>•</span>
                            <span>{story.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="max-w-3xl mx-auto px-6 mt-16 font-serif text-xl leading-relaxed text-gray-800 space-y-8">
                    <p className="first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-black">
                        We've all been there. You open your task list, see everything you need to do, and feel immediately overwhelmed. The list isn't helping—it's paralyzing you. This is why we built Focus Mode.
                    </p>
                    
                    <p>
                        Traditional productivity apps show you everything, all at once. Your brain tries to process 47 tasks simultaneously. It's cognitive overload disguised as organization.
                    </p>

                    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-8 italic text-2xl text-gray-600">
                        "The best task list is the one that shows you exactly one task: the one you should be doing right now."
                    </blockquote>

                    <h3 className="text-3xl font-bold font-sans mt-12 mb-6 text-black">The Problem with Traditional Lists</h3>
                    
                    <p>
                        Research shows that humans can effectively focus on only one thing at a time. Context switching kills productivity. When you see a list of 20 items, your brain subconsciously evaluates the difficulty of all 20, leading to decision fatigue before you've even started.
                    </p>

                    <div className="my-12 bg-gray-50 rounded-2xl p-8 border border-gray-100 font-sans text-base">
                        <h4 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Key Takeaway</h4>
                        <p className="text-gray-600">
                            We simplified the UI to remove all non-essential elements. No sidebar, no upcoming tasks, no notifications. Just the current task and a timer.
                        </p>
                    </div>

                    <p>
                        We didn't want to just hide tasks. We wanted to create an environment where deep work feels natural. This involved rethinking the entire sensory experience of the app.
                    </p>

                    <h3 className="text-3xl font-bold font-sans mt-12 mb-6 text-black">What's Next?</h3>
                    <p>
                        Focus Mode v2 is just the beginning. We're exploring adaptive soundscapes that change based on your focus depth, and integrations with smart home lighting to set the mood physically.
                    </p>
                </div>

                {/* Author Bio */}
                <div className="max-w-3xl mx-auto px-6 mt-20 pt-12 border-t border-gray-100">
                    <div className="flex gap-6 items-start">
                        <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden shrink-0">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.author}`} alt={story.author} />
                        </div>
                        <div>
                            <h4 className="font-sans font-bold text-lg mb-2">About {story.author}</h4>
                            <p className="text-gray-600 text-sm mb-4">Lead Engineer at Smart Productivity. Passionate about creating delightful user experiences and efficient systems. Coffee enthusiast.</p>
                            <div className="flex gap-4">
                                <button className="text-gray-400 hover:text-blue-500 transition-colors"><Twitter size={18} /></button>
                                <button className="text-gray-400 hover:text-blue-500 transition-colors"><Linkedin size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Newsletter */}
                <div className="max-w-4xl mx-auto mt-24 px-6">
                    <div className="bg-black text-white rounded-3xl p-12 text-center">
                        <h3 className="text-3xl font-bold mb-4">Enjoyed this story?</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get weekly insights delivered to your inbox. No spam, just deep dives and product stories.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input type="email" placeholder="Enter your email" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 w-full" />
                            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// 2. Story Card
const StoryCard: React.FC<{ story: Story; featured?: boolean; onClick: () => void }> = ({ story, featured = false, onClick }) => {
    return (
        <motion.div 
            layoutId={`story-${story.id}`}
            onClick={onClick}
            whileHover={{ y: -5 }}
            className={`group cursor-pointer ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
            <div className={`relative overflow-hidden rounded-2xl mb-4 ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'} bg-gray-100`}>
                {story.image ? (
                    <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                        <BookOpen size={48} />
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black">
                    {story.category}
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium uppercase tracking-wide">
                    <span>{story.date}</span>
                    <span>•</span>
                    <span>{story.readTime}</span>
                </div>
                <h3 className={`font-serif font-bold text-gray-900 group-hover:text-blue-600 transition-colors ${featured ? 'text-3xl md:text-4xl leading-tight' : 'text-xl leading-snug'}`}>
                    {story.title}
                </h3>
                <p className={`text-gray-600 font-serif leading-relaxed ${featured ? 'text-lg max-w-2xl' : 'text-sm line-clamp-2'}`}>
                    {story.excerpt}
                </p>
                {featured && (
                    <div className="flex items-center gap-2 pt-4">
                        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.author}`} alt={story.author} />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{story.author}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// --- MAIN PAGE ---

const BlogPage = () => {
    const [activeStory, setActiveStory] = useState<Story | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
        <div className="bg-[#fdfbf7] min-h-screen font-sans" ref={containerRef}>
            
            {/* 1. Header Entrance */}
            <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h1 className="text-7xl md:text-9xl font-serif font-black text-black mb-6 tracking-tight">Stories</h1>
                    <p className="text-xl text-gray-500 font-serif italic max-w-2xl mx-auto">
                        Ideas, insights, and inspiration from the Smart Productivity team.
                    </p>
                </motion.div>
                
                {/* Search Bar */}
                <div className="max-w-xl mx-auto mt-12 relative z-10">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search stories, topics, authors..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-full py-4 pl-12 pr-6 shadow-sm focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </section>

            {/* 2. Featured Story */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="border-b border-gray-200 pb-2 mb-8 flex justify-between items-end">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Featured Story</h2>
                </div>
                <StoryCard story={FEATURED_STORY} featured onClick={() => setActiveStory(FEATURED_STORY)} />
            </section>

            {/* 3. Main Content Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-12">
                
                {/* Sidebar Filters */}
                <aside className="lg:w-64 shrink-0 space-y-8 sticky top-24 h-fit hidden lg:block">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Filter size={16} /> Filters</h3>
                        <div className="space-y-2">
                            {['All Stories', 'Product Updates', 'Behind the Scenes', 'Thoughts', 'Tutorials'].map(cat => (
                                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded border border-gray-300 flex items-center justify-center ${cat === 'All Stories' ? 'bg-black border-black' : 'group-hover:border-gray-400'}`}>
                                        {cat === 'All Stories' && <Check size={10} className="text-white" />}
                                    </div>
                                    <span className={`text-sm ${cat === 'All Stories' ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Design', 'Engineering', 'Culture', 'Remote Work', 'Productivity'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-gray-400 cursor-pointer transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Article Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {STORIES.map(story => (
                            <StoryCard key={story.id} story={story} onClick={() => setActiveStory(story)} />
                        ))}
                    </div>
                    
                    <div className="mt-16 text-center">
                        <button className="px-8 py-3 border border-gray-300 rounded-full text-sm font-bold text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors">
                            Load More Stories
                        </button>
                    </div>
                </div>
            </section>

            {/* 4. Video & Multimedia Section */}
            <section className="bg-black text-white py-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-serif font-bold mb-2">Watch & Listen</h2>
                            <p className="text-gray-400">Deep dives, demos, and discussions.</p>
                        </div>
                        <a href="#" className="text-white border-b border-white/30 hover:border-white pb-1 text-sm font-bold hidden md:block">View All Media</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Video Card */}
                        <div className="group cursor-pointer">
                            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4 border border-white/10">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play size={20} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs font-bold">2:34</div>
                            </div>
                            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Focus Mode in Action</h3>
                            <p className="text-gray-400 text-sm">See how it works in real-time.</p>
                        </div>

                        {/* Video Card */}
                        <div className="group cursor-pointer">
                            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4 border border-white/10">
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play size={20} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs font-bold">5:12</div>
                            </div>
                            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Designing Widgets</h3>
                            <p className="text-gray-400 text-sm">Behind the scenes with the design team.</p>
                        </div>

                        {/* Podcast Card */}
                        <div className="group cursor-pointer bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors flex flex-col h-full justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
                                    <Mic size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Podcast</div>
                                    <div className="font-bold">The Stride Show</div>
                                </div>
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-2">Ep 12: Why We Don't Do Daily Standups</h3>
                            <p className="text-gray-400 text-sm mb-6">Our unconventional approach to team communication.</p>
                            <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-purple-400 transition-colors">
                                Listen Now <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Newsletter Section */}
            <section className="py-24 px-6 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <Mail className="mx-auto mb-6 text-gray-400" size={48} />
                    <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900">Stories Worth Reading</h2>
                    <p className="text-gray-600 mb-8 text-lg font-serif italic">
                        Join 12,847 readers getting our weekly digest of productivity insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
                        <input type="email" placeholder="Enter your email" className="px-6 py-4 rounded-full bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black w-full" />
                        <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap">Subscribe</button>
                    </div>
                    <p className="text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
                </div>
            </section>

            {/* Article Reader Modal */}
            <AnimatePresence>
                {activeStory ? (
                    <ArticleReader story={activeStory} onClose={() => setActiveStory(null)} />
                ) : null}
            </AnimatePresence>

        </div>
    );
};

export default BlogPage;