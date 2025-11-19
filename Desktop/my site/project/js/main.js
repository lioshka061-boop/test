import {
  initScrollAnimations,
  initParallax,
  initGradientButtons,
  initTiltCards,
  initParticleField,
  initNoiseBreathe,
} from './animations.js';
import {
  initNavigation,
  initDemoModal,
  initRippleButtons,
  initFaq,
  initPreloader,
  initFooterMeta,
  initLinkButtons,
} from './ui.js';

async function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');
  await Promise.all(
    [...includes].map(async (node) => {
      const src = node.getAttribute('data-include');
      if (!src) return;
      try {
        const response = await fetch(src);
        if (!response.ok) {
          node.outerHTML = `<div class="load-error">Не вдалось завантажити ${src}</div>`;
          return;
        }
        const html = await response.text();
        const fragment = document.createRange().createContextualFragment(html);
        node.replaceWith(fragment);
      } catch (error) {
        console.error('Include load error', error);
        node.outerHTML = `<div class="load-error">Помилка завантаження ${src}</div>`;
      }
    }),
  );
}

async function initApp() {
  initPreloader();
  await loadIncludes();
  initFooterMeta();
  initNavigation();
  initLinkButtons();
  initDemoModal();
  initRippleButtons();
  initFaq();
  initParticleField();
  initScrollAnimations();
  initParallax();
  initGradientButtons();
  initTiltCards();
  initNoiseBreathe();
}

document.addEventListener('DOMContentLoaded', () => {
  initApp().catch((error) => {
    console.error('Не вдалося ініціалізувати застосунок', error);
  });
});
