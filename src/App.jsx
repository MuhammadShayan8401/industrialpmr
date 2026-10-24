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

  useEffect(() => {
    const revealElements = document.querySelectorAll(
      '.features__intro, .grp__t, .row, .call h2, .call__num, .call__foot, .address__info, .address__map'
    );

    revealElements.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 100}ms`);
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

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main">
        <Hero />
        <Band />
        <Features />
        <Call />
        <Address />
      </main>
      <Footer />
      <div className="dock">
        <a className="btn btn--accent" href="tel:+922134320900">
          Call now
        </a>
      </div>
      <CallModal ref={modalRef} />
    </>
  );
}
