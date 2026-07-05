  // Navbar scroll state
  const navbar = document.getElementById('navbar');
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    toTop.classList.toggle('show', y > 500);
  }, { passive: true });

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile menu
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  navToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Animated counters
  const counters = document.querySelectorAll('.stat-num');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterIO.observe(el));

  // Contact form (demo — no backend)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#0F172A';
    btn.style.color = '#D4AF37';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 2400);
  });
