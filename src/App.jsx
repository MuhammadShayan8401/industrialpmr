import { useState, useRef } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Band from './components/Band.jsx';
import Features from './components/Features.jsx';
import Call from './components/Call.jsx';
import Footer from './components/Footer.jsx';
import CallModal from './components/CallModal.jsx';

export default function App() {
  const modalRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function openCall() {
    setMenuOpen(false);
    const modal = modalRef.current;
    if (modal.showModal) modal.showModal();
    else modal.setAttribute('open', '');
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} openCall={openCall} />
      <main id="main">
        <Hero openCall={openCall} />
        <Band />
        <Features />
        <Call openCall={openCall} />
        <Footer />
      </main>
      <div className="dock">
        <button className="btn btn--accent" onClick={openCall}>Request a call</button>
      </div>
      <CallModal ref={modalRef} />
    </>
  );
}
