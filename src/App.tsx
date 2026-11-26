import { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { SectionRail, useActiveSection } from './components/SectionRail';
import { HeroSection } from './components/HeroSection';
import { CombatArenaDeck } from './components/CombatArenaDeck';
import { ClassesRosterSection } from './components/ClassesRosterSection';
import { WorldLoreSection } from './components/WorldLoreSection';
import { ChroniclesSection } from './components/ChroniclesSection';
import { MediaFaqSection } from './components/MediaFaqSection';
import { Footer } from './components/Footer';
import { DownloadModal, GalleryModal } from './components/Modals';

function LandingShell() {
  const activeId = useActiveSection();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const openGallery = (idx: number) => {
    setGalleryIndex(idx);
    setGalleryOpen(true);
  };

  return (
    <div className="min-h-screen pk-canvas-bg">
      <SectionRail activeId={activeId} />
      <Navbar activeId={activeId} onDownloadClick={() => setDownloadOpen(true)} />
      <main>
        {/* 01: Hero Hook & Visual Showcase */}
        <HeroSection
          onDownloadClick={() => setDownloadOpen(true)}
          onGalleryClick={openGallery}
        />
        {/* 02: Core Gameplay — Time Sight 0.3s Instant, 4 Modes & 7 Ranks, Fair Play */}
        <CombatArenaDeck />
        {/* 03: The 6 Playable Tactician Classes */}
        <ClassesRosterSection />
        {/* 04: World & Story — Divine Eye Realm & Lore Codex */}
        <WorldLoreSection />
        {/* 05: Latest News, Patch Notes & Dev Chronicles */}
        <ChroniclesSection />
        {/* 06: Quick Start, PC Specs, Media Gallery, FAQ & Final Download CTA */}
        <MediaFaqSection
          onDownloadClick={() => setDownloadOpen(true)}
          onGalleryClick={openGallery}
        />
      </main>
      <Footer />
      <GalleryModal
        open={galleryOpen}
        initialIndex={galleryIndex}
        onClose={() => setGalleryOpen(false)}
      />
      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <LandingShell />
    </LanguageProvider>
  );
}
