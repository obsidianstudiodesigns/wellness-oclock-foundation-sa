/* ─── Scroll progress bar ─── */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrolled / total) * 100}%`;
}, { passive: true });

/* ─── Navbar scroll effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── Mobile burger menu ─── */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ─── Floating hero particles (desktop only) ─── */
function createParticles() {
  if (window.innerWidth < 700) return;
  const hero = document.getElementById('hero');
  const count = 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'hero-particle';
    const size = Math.random() * 6 + 3;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation-delay:${Math.random() * 8}s;
      animation-duration:${6 + Math.random() * 8}s;
      opacity:${0.2 + Math.random() * 0.5};
    `;
    hero.appendChild(p);
  }
}
createParticles();

/* ─── Typewriter on hero heading ─── */
function typewriter(el, text1, text2, speed = 55) {
  el.innerHTML = '';
  let i = 0;
  const line1 = document.createElement('span');
  const line2 = document.createElement('em');
  el.appendChild(line1);

  function typeLine1() {
    if (i < text1.length) {
      line1.textContent += text1[i++];
      setTimeout(typeLine1, speed);
    } else {
      el.appendChild(document.createElement('br'));
      el.appendChild(line2);
      i = 0;
      setTimeout(typeLine2, speed + 200);
    }
  }

  function typeLine2() {
    if (i < text2.length) {
      line2.textContent += text2[i++];
      setTimeout(typeLine2, speed);
    }
  }
  typeLine1();
}

window.addEventListener('load', () => {
  const heroH1 = document.querySelector('.hero-heading');
  if (heroH1) typewriter(heroH1, 'Your Wellness Journey', 'Starts Here');
});

/* ─── Scroll Reveal (staggered children) ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── Animated number counters ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

/* ─── 3D Tilt on service & credential cards ─── */
document.querySelectorAll('.service-card, .cred-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

/* ─── Ripple effect on buttons ─── */
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* ─── Active nav link on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) a.style.color = 'var(--gold)';
  });
}, { passive: true });

/* ─── Magnetic effect on CTA buttons ─── */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ─── Animated credential card border shimmer on hover ─── */
document.querySelectorAll('.cred-card').forEach((card, i) => {
  card.style.animationDelay = `${i * 0.2}s`;
});

/* ─── Contact form ─── */
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast("Thank you! We'll be in touch shortly. 🌿");
  form.reset();
});

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ─── Event Image Lightbox ─── */
(function() {
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg || !lightboxClose) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { if (!lightbox.classList.contains('open')) lightboxImg.src = ''; }, 300);
  }

  /* Event delegation — one listener on the grid, ignore "Book Now" clicks */
  const eventsSection = document.getElementById('events');
  if (eventsSection) {
    eventsSection.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      const wrap = e.target.closest('.event-img-wrap');
      if (!wrap) return;
      const img = wrap.querySelector('img');
      if (img && img.src) openLightbox(img.src, img.alt);
    });
  }

  lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });
})();

/* ─── Cylinder Carousel ─── */
(function() {
  const track   = document.getElementById('cylinderTrack');
  const items   = document.querySelectorAll('.cylinder-item');
  const dots    = document.querySelectorAll('.cyl-dot');
  const total   = items.length;
  let current   = 0;
  let autoTimer = null;

  function goTo(idx) {
    items[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + total) % total;
    items[current].classList.add('active');
    dots[current].classList.add('active');
    track.style.transform = `rotateY(${-current * (360 / total)}deg)`;
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 3500);
  }
  function stopAuto() { clearInterval(autoTimer); }

  document.getElementById('cylNext').addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  document.getElementById('cylPrev').addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { stopAuto(); goTo(+d.dataset.i); startAuto(); }));

  /* touch swipe */
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { stopAuto(); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
  }, { passive: true });

  startAuto();
})();

/* ─── Parallax on hero (desktop only) ─── */
const hero = document.getElementById('hero');
if (window.innerWidth >= 700) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      hero.style.backgroundPositionY = `calc(50% + ${y * 0.3}px)`;
    }
  }, { passive: true });
}

/* ─── Animated section label shimmer trigger ─── */
const labelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('shimmer-active');
      labelObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.8 });

document.querySelectorAll('.section-label').forEach(el => labelObserver.observe(el));

/* ─── Smooth cursor glow (desktop only) ─── */
if (window.matchMedia('(pointer:fine)').matches) {
  const cursor = document.createElement('div');
  cursor.id = 'cursor-glow';
  document.body.appendChild(cursor);

  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animateCursor() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('a, button, .service-card, .cred-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}
