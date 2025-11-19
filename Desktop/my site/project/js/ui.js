function smoothScrollTo(target) {
  const el = document.querySelector(target);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('is-open');
    });

    navList.addEventListener('click', (event) => {
      if (event.target.matches('a[data-scroll]')) {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('[data-scroll], [data-scroll-to]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const target = trigger.getAttribute('href') || trigger.dataset.scrollTo;
      if (target) smoothScrollTo(target);
    });
  });
}

export function initLinkButtons() {
  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-link]');
    if (!target) return;
    event.preventDefault();
    const url = target.dataset.link;
    const winTarget = target.dataset.linkTarget || '_blank';
    if (url) {
      window.open(url, winTarget);
    }
  });
}

export function initDemoModal() {
  const modal = document.getElementById('demo-modal');
  const video = document.getElementById('demo-video');
  if (!modal || !video) return;
  const openButtons = document.querySelectorAll('[data-open-modal="demo"]');

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    video.pause();
  };

  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  openButtons.forEach((btn) => btn.addEventListener('click', openModal));
  modal.querySelectorAll('[data-modal-close]').forEach((btn) => btn.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

export function initRippleButtons() {
  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
}

export function initFaq() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const toggle = item.querySelector('.faq-toggle');
    const body = item.querySelector('.faq-body');
    if (!toggle || !body) return;
    toggle.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    requestAnimationFrame(() => preloader.classList.add('is-hidden'));
  });
}

export function initFooterMeta() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
