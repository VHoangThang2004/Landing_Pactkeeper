import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AstryxRoot } from './components/AstryxRoot';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AstryxRoot>
      <App />
    </AstryxRoot>
  </StrictMode>,
);
