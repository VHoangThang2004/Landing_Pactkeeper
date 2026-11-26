import { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TimelineMechanicSection } from './components/TimelineMechanicSection';
import { ClassesRosterSection } from './components/ClassesRosterSection';
import { ModesAndRankingSection } from './components/ModesAndRankingSection';
import { StoryLoreSection } from './components/StoryLoreSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FairnessTrustSection } from './components/FairnessTrustSection';
import { SystemReqAndFaqSection } from './components/SystemReqAndFaqSection';
import { Footer } from './components/Footer';
import { DownloadModal, GalleryModal } from './components/Modals';

export default function App() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const openGallery = (idx: number) => {
    setGalleryIndex(idx);
    setGalleryOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen pk-canvas-bg">
        <Navbar onDownloadClick={() => setDownloadOpen(true)} />
        <main>
          <HeroSection
            onDownloadClick={() => setDownloadOpen(true)}
            onGalleryClick={openGallery}
          />
          <TimelineMechanicSection />
          <ClassesRosterSection />
          <ModesAndRankingSection />
          <StoryLoreSection />
          <HowItWorksSection />
          <FairnessTrustSection />
          <SystemReqAndFaqSection onDownloadClick={() => setDownloadOpen(true)} />
        </main>
        <Footer />
        <GalleryModal
          open={galleryOpen}
          initialIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
        <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
      </div>
    </LanguageProvider>
  );
}
