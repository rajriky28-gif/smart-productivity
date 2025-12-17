import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Stats from './components/Stats.tsx';
import Products from './components/Products.tsx';
import Features from './components/Features.tsx';
import Platforms from './components/Platforms.tsx';
import CallToAction from './components/CallToAction.tsx';
import Footer from './components/Footer.tsx';
import GeminiAssistant from './components/GeminiAssistant.tsx';
import ProductsPage from './components/ProductsPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import StridePage from './components/StridePage.tsx';

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
        ) : (
            <Hero onNavigate={navigateTo} />
        )}
      </main>
      <Footer onNavigate={navigateTo} />
      <GeminiAssistant />
    </div>
  );
}

export default App;