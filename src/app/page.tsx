'use client';

import React, { useEffect, useState, useRef } from 'react';
import './sombrerero.css';

export default function SombrereroPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const fragmentos = [
    {
      id: 'I',
      title: 'Jocki Náufrago',
      text: '"Ella no canta en escenarios, pero suena bien bajo la ducha. Tiene voz de ningún lugar, la invitaron otra vez a esta vida. Padece el síndrome del que despierta riendo, tal vez sea su propio imitador."'
    },
    {
      id: 'II',
      title: 'El Bar de los Náufragos',
      text: '"Tengo voz de ningún lugar, me invitaron otra vez a esta vida. Padezco el síndrome del que despierta riendo, tal vez sea mi propio imitador. Suelo celoso, donde hay amor."'
    },
    {
      id: 'III',
      title: 'Amnesia Emergente',
      text: '"Esa figura camina. Infinita noche. Duda es mi cansancio, espero no fallarte. Para tu lagrimal, el fuego amarillo de tus pasos, casi en tus bordes."'
    },
    {
      id: 'IV',
      title: 'Perpetuida',
      text: '"Lo dejaré demasiado escrito en la penumbra para que solo la eternidad lo pueda ver. Damas y caballeros, la noche va a comenzar. Constelaciones."'
    },
    {
      id: 'V',
      title: 'El Hangar del Sol',
      text: '"Todo escribí en la noche. Ella es la luna. El eterno fabricante de misterios. Te voy a seguir, donde hay amor, en otras dimensiones."'
    }
  ];

  const pStripRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // ─── NAV SCROLL ────────────────────────────
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Parallax
      if (pStripRef.current) {
        const rect = pStripRef.current.parentElement?.parentElement?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.3;
          const offset = (rect.top / window.innerHeight) * 100 * speed;
          pStripRef.current.style.transform = `translateY(${offset}px)`;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // ─── SCROLL ANIMATIONS ─────────────────────
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // ─── AUTO-ADVANCE CAROUSEL ──────────────────
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % fragmentos.length);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [fragmentos.length]);

  const goTo = (idx: number) => {
    setCurrentSlide((idx + fragmentos.length) % fragmentos.length);
  };

  return (
    <div className="sombrerero-body">
      {/* ══════════ NAVIGATION ══════════ */}
      <nav id="main-nav" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">SN</a>
          <button 
            className="nav-toggle" 
            id="nav-toggle" 
            aria-label="Menú"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span></span><span></span><span></span>
          </button>
          <ul className={`nav-links ${isNavOpen ? 'open' : ''}`} id="nav-links">
            <li><a href="#mundo" onClick={() => setIsNavOpen(false)}>El Mundo</a></li>
            <li><a href="#libro" onClick={() => setIsNavOpen(false)}>El Libro</a></li>
            <li><a href="#fragmentos" onClick={() => setIsNavOpen(false)}>Fragmentos</a></li>
            <li><a href="#artista" onClick={() => setIsNavOpen(false)}>El Artista</a></li>
            <li><a href="#comprar" className="nav-cta" onClick={() => setIsNavOpen(false)}>Adquirir</a></li>
          </ul>
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section id="hero">
        <div className="hero-bg">
          <img src="/images/artist-8.jpg" alt="El Sombrerero Náufrago en la Isla del Sol" className="hero-img" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Un viaje entre la tinta y el horizonte</p>
          <h1 className="hero-title">El Sombrerero<br /><span>Náufrago</span></h1>
          <p className="hero-subtitle">Tengo voz de ningún lugar, me invitaron otra vez a esta vida.<br />Padezco el síndrome del que despierta riendo.</p>
          <a href="#libro" className="btn-primary" id="hero-cta">Descubrir el Viaje</a>
        </div>
        <div className="scroll-indicator">
          <span>Descender</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ══════════ EL MUNDO ══════════ */}
      <section id="mundo">
        <div className="section-header">
          <span className="section-tag">El Universo</span>
          <h2 className="section-title">Donde la tierra se encuentra con el cielo</h2>
        </div>
        <div className="mundo-grid">
          <div className="mundo-card" data-animate>
            <div className="mundo-img-wrap">
              <img src="/images/artist-3.jpg" alt="Pared azul junto al lago" />
            </div>
            <blockquote className="mundo-quote">"Ella no canta en escenarios, pero suena bien bajo la ducha."</blockquote>
          </div>
          <div className="mundo-card mundo-card--tall" data-animate>
            <div className="mundo-img-wrap">
              <img src="/images/artist-5.jpg" alt="El artista frente al lago Titicaca" />
            </div>
            <blockquote className="mundo-quote">"El fuego amarillo de tus pasos, casi en tus bordes."</blockquote>
          </div>
          <div className="mundo-card" data-animate>
            <div className="mundo-img-wrap">
              <img src="/images/artist-10.jpg" alt="Paisaje andino" />
            </div>
            <blockquote className="mundo-quote">"Todo escribí en la noche. Ella es la luna."</blockquote>
          </div>
          <div className="mundo-card mundo-card--wide" data-animate>
            <div className="mundo-img-wrap">
              <img src="/images/artist-14.jpg" alt="El artista en la cima" />
            </div>
            <blockquote className="mundo-quote">"Lo dejaré demasiado escrito en la penumbra para que solo la eternidad lo pueda ver."</blockquote>
          </div>
        </div>
      </section>

      {/* ══════════ EL LIBRO ══════════ */}
      <section id="libro">
        <div className="libro-layout">
          <div className="libro-visual" data-animate>
            <div className="libro-mockup">
              <div className="libro-cover">
                <div className="libro-cover-inner">
                  <span className="libro-cover-tag">Poesía · Misterio · Viaje</span>
                  <h3 className="libro-cover-title">El Sombrerero Náufrago</h3>
                  <p className="libro-cover-author">Eustakio Alguien</p>
                </div>
              </div>
              <div className="libro-spine"></div>
              <div className="libro-shadow"></div>
            </div>
          </div>
          <div className="libro-info" data-animate>
            <span className="section-tag">El Libro</span>
            <h2 className="section-title">Perpetuida</h2>
            <p className="libro-desc">Damas y caballeros, la noche va a comenzar. Este libro es un naufragio voluntario — un viaje por la poesía que no busca costas, sino profundidad. Cada página es una isla donde las palabras respiran sal y las metáforas caminan descalzas sobre la arena del tiempo.</p>
            <p className="libro-desc">Un manuscrito que nació entre montañas y lagos, escrito con la tinta del que sabe que perderse es la única forma de encontrarse.</p>
            <ul className="libro-details">
              <li><strong>Género:</strong> Poesía / Narrativa Experimental</li>
              <li><strong>Autor:</strong> Eustakio Alguien</li>
              <li><strong>Páginas:</strong> Edición Premium</li>
            </ul>
            <div className="libro-price-wrap">
              <span className="libro-price">$24.99 USD</span>
              <a href="#comprar" className="btn-primary" id="libro-buy-cta">Adquirir Ahora</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FRAGMENTOS ══════════ */}
      <section id="fragmentos">
        <div className="section-header">
          <span className="section-tag">Fragmentos</span>
          <h2 className="section-title">Páginas que respiran</h2>
        </div>
        <div className="fragmentos-carousel" id="fragmentos-carousel">
          {fragmentos.map((f, i) => (
            <div key={i} className={`fragmento-slide ${currentSlide === i ? 'active' : ''}`}>
              <div className="fragmento-number">{f.id}</div>
              <h3 className="fragmento-title">{f.title}</h3>
              <p className="fragmento-text">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="fragmentos-nav">
          <button className="frag-prev" id="frag-prev" aria-label="Anterior" onClick={() => goTo(currentSlide - 1)}>&#8592;</button>
          <div className="frag-dots" id="frag-dots">
            {fragmentos.map((_, i) => (
              <span 
                key={i} 
                className={`frag-dot ${currentSlide === i ? 'active' : ''}`}
                onClick={() => goTo(i)}
              ></span>
            ))}
          </div>
          <button className="frag-next" id="frag-next" aria-label="Siguiente" onClick={() => goTo(currentSlide + 1)}>&#8594;</button>
        </div>
      </section>

      {/* ══════════ GALERÍA PARALLAX ══════════ */}
      <section id="galeria-parallax">
        <div className="parallax-strip">
          <img ref={pStripRef} src="/images/artist-7.jpg" alt="Viaje del náufrago" />
          <div className="parallax-overlay">
            <p className="parallax-quote">"El eterno fabricante de misterios"</p>
          </div>
        </div>
      </section>

      {/* ══════════ EL ARTISTA ══════════ */}
      <section id="artista">
        <div className="artista-layout">
          <div className="artista-photo" data-animate>
            <img src="/images/artist-4.jpg" alt="Eustakio Alguien" />
          </div>
          <div className="artista-bio" data-animate>
            <span className="section-tag">El Artista</span>
            <h2 className="section-title">Eustakio Alguien</h2>
            <p>Un caminante entre mundos que escribe donde la tierra se acaba. Carga un libro rojo como brújula y convierte cada horizonte en verso. Náufrago por vocación, poeta por accidente, eterno por decisión.</p>
            <p>Su escritura nace en las alturas del altiplano, entre lagos que reflejan cielos imposibles y montañas que guardan secretos ancestrales. No busca lectores — busca cómplices.</p>
            <div className="artista-social">
              <a href="mailto:info@sombrereronaufrago.com" className="social-link" aria-label="Email">✉</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ COMPRAR ══════════ */}
      <section id="comprar">
        <div className="comprar-container">
          <div className="comprar-content" data-animate>
            <span className="section-tag">Adquirir</span>
            <h2 className="section-title">Comienza el viaje</h2>
            <p className="comprar-desc">Cada ejemplar es una invitación a naufragar. No es solo un libro — es un mapa hacia lo que no se ve.</p>
            <div className="comprar-card">
              <div className="comprar-card-header">
                <h3>El Sombrerero Náufrago</h3>
                <span className="comprar-edition">Edición Premium</span>
              </div>
              <div className="comprar-card-price">
                <span className="price-amount">$24.99</span>
                <span className="price-currency">USD</span>
              </div>
              <ul className="comprar-features">
                <li>✦ Libro completo — poesía y narrativa experimental</li>
                <li>✦ Fotografías originales del viaje</li>
                <li>✦ Edición digital de alta calidad</li>
                <li>✦ Acceso a contenido exclusivo</li>
              </ul>
              <a href="mailto:info@sombrereronaufrago.com?subject=Quiero adquirir El Sombrerero Náufrago" className="btn-primary btn-comprar" id="buy-now-btn">
                Adquirir Ahora
              </a>
              <p className="comprar-note">Envío digital inmediato tras la confirmación</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section id="newsletter">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Únete a los náufragos</h2>
          <p className="newsletter-desc">Recibe fragmentos exclusivos, noticias del viaje y adelantos antes que nadie.</p>
          <form className="newsletter-form" id="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="tu@email.com" required id="newsletter-email" aria-label="Email" />
            <button type="submit" className="btn-primary" id="newsletter-submit">Zarpar</button>
          </form>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer id="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">SN</span>
            <p>El Sombrerero Náufrago &copy; 2026<br />Todos los derechos reservados.</p>
          </div>
          <div className="footer-links">
            <a href="#hero">Inicio</a>
            <a href="#libro">El Libro</a>
            <a href="#artista">El Artista</a>
            <a href="#comprar">Comprar</a>
          </div>
          <div className="footer-contact">
            <a href="mailto:info@sombrereronaufrago.com">info@sombrereronaufrago.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
