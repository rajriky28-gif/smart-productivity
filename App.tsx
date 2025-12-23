import React, { useState, Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Footer from './components/Footer.tsx';
import { auth } from './services/firebase.ts';
import { onAuthStateChanged, User } from 'firebase/auth';
import GeminiAssistant from './components/GeminiAssistant.tsx';

// Lazy load heavy components and pages to improve initial load time
const Products = lazy(() => import('./components/Products.tsx'));
const Features = lazy(() => import('./components/Features.tsx'));
const Stats = lazy(() => import('./components/Stats.tsx'));
const Platforms = lazy(() => import('./components/Platforms.tsx'));
const CallToAction = lazy(() => import('./components/CallToAction.tsx'));

const AuthPage = lazy(() => import('./components/AuthPage.tsx'));
const ProductsPage = lazy(() => import('./components/ProductsPage.tsx'));
const AboutPage = lazy(() => import('./components/AboutPage.tsx'));
const ContactPage = lazy(() => import('./components/ContactPage.tsx'));
const SupportPage = lazy(() => import('./components/SupportPage.tsx'));
const StridePage = lazy(() => import('./components/StridePage.tsx'));
const RoadmapPage = lazy(() => import('./components/RoadmapPage.tsx'));
const UpdatesPage = lazy(() => import('./components/UpdatesPage.tsx'));
const BlogPage = lazy(() => import('./components/BlogPage.tsx'));

// Simple loader for page transitions
const PageLoader = () => (
  <div className="h-[80vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
  </div>
);

function App() {
  // Helper to determine view from URL hash
  const getInitialView = () => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace('#', '');
    if (!hash) return 'home';
    
    const validViews = [
        'auth', 'products', 'about', 'contact', 'support', 
        'stride', 'roadmap', 'updates', 'blog', 'home'
    ];
    return validViews.includes(hash) ? hash : 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [user, setUser] = useState<User | null>(null);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen for auth changes
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }
  }, []);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update Browser URL without reload
    const newHash = view === 'home' ? '' : `#${view}`;
    // Only push if different to avoid duplicate history entries if clicked multiple times
    if (window.location.hash.replace('#', '') !== (view === 'home' ? '' : view)) {
        if (view === 'home') {
             // Clean URL for home
             window.history.pushState(null, '', window.location.pathname + window.location.search);
        } else {
             window.history.pushState(null, '', newHash);
        }
    }
  };

  // The Home page is now a dark, immersive experience. 
  // Other pages remain light/standard.
  const isHome = currentView === 'home';
  const isAuth = currentView === 'auth';

  // If in Auth view, we might not want the standard Navbar/Footer
  if (isAuth) {
      return (
          <Suspense fallback={<PageLoader />}>
              <AuthPage onNavigate={navigateTo} />
          </Suspense>
      );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isHome ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar currentView={currentView} onNavigate={navigateTo} user={user} />
      <main>
        <Suspense fallback={<PageLoader />}>
          {currentView === 'home' ? (
            <>
              <Hero onNavigate={navigateTo} />
              <Products />
              <Features />
              <Stats />
              <Platforms />
              <CallToAction />
            </>
          ) : currentView === 'products' ? (
            <ProductsPage />
          ) : currentView === 'about' ? (
            <AboutPage onNavigate={navigateTo} />
          ) : currentView === 'contact' ? (
              <ContactPage />
          ) : currentView === 'support' ? (
              <SupportPage onNavigate={navigateTo} />
          ) : currentView === 'stride' ? (
              <StridePage />
          ) : currentView === 'roadmap' ? (
              <RoadmapPage />
          ) : currentView === 'updates' ? (
              <UpdatesPage />
          ) : currentView === 'blog' ? (
              <BlogPage />
          ) : (
              // Fallback to Home if unknown
              <>
                <Hero onNavigate={navigateTo} />
                <Products />
                <Features />
                <Stats />
                <Platforms />
                <CallToAction />
              </>
          )}
        </Suspense>
      </main>
      <Footer onNavigate={navigateTo} />
      <GeminiAssistant />
    </div>
  );
}

export default App;