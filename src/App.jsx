
import { useState, useRef, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Band from './components/Band.jsx';
import Features from './components/Features.jsx';
import Call from './components/Call.jsx';
import Address from './components/Address.jsx';
import Footer from './components/Footer.jsx';
import CallModal from './components/CallModal.jsx';

export default function App() {
  const modalRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const revealElements = document.querySelectorAll(
  '.features__intro, .grp__t, .row, .call h2, .call__num, .call__foot, .address__info, .address__map, .footer__top > *'
  );

    revealElements.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty(
        '--reveal-delay',
        `${(index % 4) * 100}ms`
      );
    });

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  function openCall() {
    setMenuOpen(false);
    const modal = modalRef.current;
    if (modal.showModal) modal.showModal();
    else modal.setAttribute('open', '');
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openCall={openCall}
      />
      <main id="main">
        <Hero openCall={openCall} />
        <Band />
        <Features />
        <Call openCall={openCall} />
        <Address />
        <Footer />
      </main>
      <div className="dock">
        <button className="btn btn--accent" onClick={openCall}>
          Request a call
        </button>
      </div>
      <CallModal ref={modalRef} />
    </>
  );
}
