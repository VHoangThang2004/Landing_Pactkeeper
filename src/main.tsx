import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import './index.css';
import './styles/interactions.css';
import { AstryxRoot } from './components/AstryxRoot';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AstryxRoot>
      <App />
    </AstryxRoot>
  </StrictMode>,
);
