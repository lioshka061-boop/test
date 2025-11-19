const cubic = 'cubic-bezier(0.4, 0, 0.2, 1)';

const animationState = {
  observer: null,
  parallaxTargets: [],
  tiltCards: [],
};

function revealOnScroll(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      if (entry.target.dataset.delay) {
        entry.target.style.setProperty('--planet-delay', `${entry.target.dataset.delay}s`);
        entry.target.classList.add('planet-ready');
      }
      animationState.observer.unobserve(entry.target);
    }
  });
}

export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  animationState.observer = new IntersectionObserver(revealOnScroll, {
    threshold: 0.2,
  });
  animatedElements.forEach((el) => animationState.observer.observe(el));
}

export function initParallax() {
  animationState.parallaxTargets = [...document.querySelectorAll('[data-depth]')];
  if (!animationState.parallaxTargets.length) return;

  const applyParallax = () => {
    const scrollY = window.scrollY;
    animationState.parallaxTargets.forEach((el) => {
      const depth = parseFloat(el.dataset.depth || '0.2');
      const translateY = scrollY * depth * 0.04;
      el.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });
  };

  applyParallax();
  window.addEventListener('scroll', applyParallax, { passive: true });
}

export function initGradientButtons() {
  const buttons = document.querySelectorAll('.primary-btn, .ghost-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('pointermove', (event) => {
      const rect = btn.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--glow-x', `${x}%`);
      btn.style.setProperty('--glow-y', `${y}%`);
    });
  });
}

export function initTiltCards() {
  animationState.tiltCards = [...document.querySelectorAll('.tilt-card')];
  animationState.tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    });
  });
}

export function initParticleField() {
  const field = document.getElementById('particle-field');
  if (!field) return;
  const total = 40;
  field.innerHTML = '';
  for (let i = 0; i < total; i += 1) {
    const span = document.createElement('span');
    span.style.left = `${Math.random() * 100}%`;
    span.style.top = `${Math.random() * 100}%`;
    span.style.animationDelay = `${Math.random() * 6}s`;
    span.style.animationDuration = `${8 + Math.random() * 6}s`;
    field.appendChild(span);
  }
}

export function initNoiseBreathe() {
  const hero = document.querySelector('.hero__copy');
  if (!hero) return;
  let toggle = false;
  setInterval(() => {
    toggle = !toggle;
    hero.style.boxShadow = toggle ? '0 30px 90px rgba(70, 78, 235, 0.3)' : '0 20px 60px rgba(10, 12, 18, 0.7)';
  }, 4000);
}
