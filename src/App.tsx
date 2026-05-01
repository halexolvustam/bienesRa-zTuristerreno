import { LanguageProvider } from '@/hooks/useLanguage';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { Developments } from '@/sections/Developments';
import { About } from '@/sections/About';
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
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;