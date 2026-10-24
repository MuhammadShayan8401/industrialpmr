import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import InfoPage, { pages } from './pages/InfoPage.jsx';

const root = document.getElementById('root');
const page = root.dataset.page;

if (pages[page]) {
  createRoot(root).render(
    <StrictMode>
      <InfoPage page={page} />
    </StrictMode>
  );
}
