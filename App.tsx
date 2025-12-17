import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Products from './components/Products';
import Features from './components/Features';
import Platforms from './components/Platforms';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';
import ProductsPage from './components/ProductsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import StridePage from './components/StridePage';

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