import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Products from './components/Products';
import Features from './components/Features';
import Platforms from './components/Platforms';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';

// Lazy load pages to reduce main bundle size (Fixes 500kB warning)
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
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
  const [currentView, setCurrentView] = useState('home');

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The Home page is now a dark, immersive experience. 
  // Other pages remain light/standard.
  const isHome = currentView === 'home';

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