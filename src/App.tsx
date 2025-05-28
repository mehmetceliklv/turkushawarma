import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="font-sans">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <main>
            <Hero />
            <Menu />
            <About />
            <Gallery />
            <Contact />
          </main>
          <Footer />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;