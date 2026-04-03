import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Packages } from '@/sections/Packages';
import { QuoteCalculator } from '@/sections/QuoteCalculator';
import { Gallery } from '@/sections/Gallery';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <Packages />
      <QuoteCalculator />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
