import React, { useState, Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy load heavy components and pages to improve initial load time
const Products = lazy(() => import('./components/Products'));
const Features = lazy(() => import('./components/Features'));
const Stats = lazy(() => import('./components/Stats'));
const Platforms = lazy(() => import('./components/Platforms'));
const CallToAction = lazy(() => import('./components/CallToAction'));
const GeminiAssistant = lazy(() => import('./components/GeminiAssistant'));

const AuthPage = lazy(() => import('./components/AuthPage'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const SupportPage = lazy(() => import('./components/SupportPage'));
const StridePage = lazy(() => import('./components/StridePage'));
const RoadmapPage = lazy(() => import('./components/RoadmapPage'));
const UpdatesPage = lazy(() => import('./components/UpdatesPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));

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

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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
      <Navbar currentView={currentView} onNavigate={navigateTo} />
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
      <Suspense fallback={null}>
        <GeminiAssistant />
      </Suspense>
    </div>
  );
}

export default App;