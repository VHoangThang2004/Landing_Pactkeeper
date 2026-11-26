import type { ReactNode } from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { ToastViewport } from '@astryxdesign/core/Toast';
import { defaultThemeSlug, themes } from '../astryx-themes';
import { ThemeModeProvider, useThemeMode } from '../context/ThemeModeContext';
import { useInteractiveFeel } from '../hooks/useInteractiveFeel';

function AstryxThemeBridge({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();
  useInteractiveFeel();

  return (
    <Theme theme={themes[defaultThemeSlug]} mode={mode}>
      <ToastViewport position="bottomEnd" maxVisible={3}>
        {children}
      </ToastViewport>
    </Theme>
  );
}

export function AstryxRoot({ children }: { children: ReactNode }) {
  return (
    <ThemeModeProvider>
      <AstryxThemeBridge>{children}</AstryxThemeBridge>
    </ThemeModeProvider>
  );
}
