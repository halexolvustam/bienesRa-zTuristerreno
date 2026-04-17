import { LanguageProvider } from '@/hooks/useLanguage';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { Developments } from '@/sections/Developments';
import { Gallery } from '@/sections/Gallery';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Developments />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
