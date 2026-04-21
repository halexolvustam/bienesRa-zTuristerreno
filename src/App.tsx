import { LanguageProvider } from '@/hooks/useLanguage';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { Developments } from '@/sections/Developments';
simport { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import './App.css';
import DevelopmentCard from "./components/ui/DevelopmentCard";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Developments />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
