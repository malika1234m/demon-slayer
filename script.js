/* ── Demon Slayer Fan Site — JS ── */

/* Particles */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = [
    'rgba(192,57,43,0.6)',
    'rgba(231,76,60,0.5)',
    'rgba(212,168,67,0.4)',
    'rgba(240,192,64,0.4)',
    'rgba(255,182,193,0.3)',
    'rgba(79,172,254,0.3)',
    'rgba(192,132,252,0.3)',
  ];

  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 10}s;
      filter:blur(${Math.random() > 0.7 ? '1px' : '0'});
    `;
    container.appendChild(p);
  }
})();

/* Cherry Blossoms */
(function createPetals() {
  const container = document.getElementById('cherryContainer');
  if (!container) return;

  const sizes = [6, 8, 10, 12];
  const pinkHues = [
    'rgba(255,182,193,0.7)',
    'rgba(255,160,170,0.6)',
    'rgba(255,200,210,0.7)',
    'rgba(220,140,160,0.5)',
  ];

  for (let i = 0; i < 30; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    petal.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      background:${pinkHues[Math.floor(Math.random() * pinkHues.length)]};
      animation-duration:${Math.random() * 8 + 6}s;
      animation-delay:${Math.random() * 8}s;
      border-radius:${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
    `;
    container.appendChild(petal);
  }
})();

/* Navbar scroll behavior */
(function navbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* Mobile nav toggle */
(function mobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

/* Reveal on scroll (IntersectionObserver) */
(function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in the same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* Smooth active nav highlight */
(function activeNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--gold)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* Sword card tilt effect */
(function cardTilt() {
  const cards = document.querySelectorAll('.sword-card, .hashira-card, .demon-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) * 5;
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* Flame cursor trail */
(function flameCursor() {
  const trail = [];
  const MAX = 12;

  for (let i = 0; i < MAX; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;
      pointer-events:none;
      z-index:9999;
      width:${6 + i * 0.5}px;
      height:${6 + i * 0.5}px;
      border-radius:50%;
      background:radial-gradient(circle, rgba(231,76,60,${0.8 - i * 0.06}) 0%, transparent 70%);
      transition:transform 0.05s ease;
      opacity:0;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trail[0].x = mouseX;
    trail[0].y = mouseY;
    trail[0].el.style.opacity = '1';
    trail[0].el.style.left = `${mouseX - 3}px`;
    trail[0].el.style.top  = `${mouseY - 3}px`;
  });

  let frame;
  function updateTrail() {
    for (let i = 1; i < MAX; i++) {
      trail[i].x += (trail[i-1].x - trail[i].x) * 0.35;
      trail[i].y += (trail[i-1].y - trail[i].y) * 0.35;
      trail[i].el.style.left    = `${trail[i].x - 3}px`;
      trail[i].el.style.top     = `${trail[i].y - 3}px`;
      trail[i].el.style.opacity = `${(MAX - i) / MAX * 0.6}`;
    }
    frame = requestAnimationFrame(updateTrail);
  }
  updateTrail();

  // Pause trail when mouse leaves window
  document.addEventListener('mouseleave', () => {
    trail.forEach(t => t.el.style.opacity = '0');
  });
})();

/* Blade card shimmer on hover */
(function bladeShimmer() {
  const bladeCards = document.querySelectorAll('.sword-card');
  bladeCards.forEach(card => {
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
      position:absolute;
      top:-100%;left:-60%;
      width:40%;height:300%;
      background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.06) 50%,transparent 60%);
      transform:skewX(-20deg);
      transition:left 0.6s ease;
      pointer-events:none;
      z-index:10;
    `;
    card.style.position = 'relative';
    card.appendChild(shimmer);

    card.addEventListener('mouseenter', () => {
      shimmer.style.left = '120%';
    });
    card.addEventListener('mouseleave', () => {
      shimmer.style.transition = 'none';
      shimmer.style.left = '-60%';
      requestAnimationFrame(() => {
        shimmer.style.transition = 'left 0.6s ease';
      });
    });
  });
})();

/* Dynamic section background gradient */
(function sectionGradient() {
  const swords  = document.getElementById('swords');
  const hashira = document.getElementById('hashira');
  const legends = document.getElementById('legends');
  const demons  = document.getElementById('demons');

  if (!swords || !hashira || !demons) return;

  const maps = [
    { el: swords,  color: '192,57,43'  },
    { el: hashira, color: '59,130,246' },
    { el: legends, color: '212,168,67' },
    { el: demons,  color: '239,68,68'  },
  ];

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const match = maps.find(m => m.el === entry.target);
        if (match) {
          document.body.style.transition = 'background 1s ease';
          document.body.style.background = `radial-gradient(ellipse at 50% 0%, rgba(${match.color},0.04) 0%, #08080f 50%)`;
        }
      }
    });
  }, { threshold: 0.3 });

  maps.forEach(m => obs.observe(m.el));
})();

/* Typing effect on hero tagline */
(function typeEffect() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;

  const originalText = tagline.textContent;
  tagline.textContent = '';
  tagline.style.opacity = '1';

  let i = 0;
  const speed = 40;

  function typeChar() {
    if (i < originalText.length) {
      tagline.textContent += originalText[i++];
      setTimeout(typeChar, speed + Math.random() * 20);
    }
  }

  // Start after hero elements reveal
  setTimeout(typeChar, 1500);
})();

console.log('%c鬼滅の刃 — Demon Slayer Fan Site', 'color:#c0392b;font-size:1.2rem;font-weight:bold;');
console.log('%cBuilt with passion for the Demon Slayer universe', 'color:#d4a843;');
