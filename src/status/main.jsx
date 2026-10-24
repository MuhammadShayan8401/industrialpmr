import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './status.css';
import StatusApp from './StatusApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StatusApp />
  </StrictMode>
);
