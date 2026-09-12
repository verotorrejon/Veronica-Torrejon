document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.primary-nav a')];
const progressBar = document.querySelector('.page-progress span');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  if (!navToggle || !primaryNav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  primaryNav.classList.remove('is-open');
  document.body.classList.remove('nav-open');
};

const openMenu = () => {
  if (!navToggle || !primaryNav) return;
  navToggle.setAttribute('aria-expanded', 'true');
  primaryNav.classList.add('is-open');
  document.body.classList.add('nav-open');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const expandFeatures = [...document.querySelectorAll('[data-scroll-expand]')];
const parallaxItems = [...document.querySelectorAll('[data-parallax]')];

const updateScrollEffects = () => {
  if (prefersReducedMotion) return;

  const viewportHeight = window.innerHeight;
  const isCompact = window.innerWidth <= 720;

  expandFeatures.forEach((feature) => {
    if (feature.offsetParent === null) return;
    const rect = feature.getBoundingClientRect();
    const start = viewportHeight * .92;
    const end = viewportHeight * .2;
    const progress = clamp((start - rect.top) / (start - end), 0, 1);
    const inset = (isCompact ? 17 : 7) * (1 - progress);
    const unit = isCompact ? 'px' : 'vw';
    feature.style.setProperty('--expand-inset', `${inset.toFixed(2)}${unit}`);
    feature.style.setProperty('--expand-radius', `${(24 - progress * 12).toFixed(1)}px`);
  });

  parallaxItems.forEach((item) => {
    if (item.offsetParent === null) return;
    const rect = item.getBoundingClientRect();
    const strength = Number(item.dataset.parallax || 12);
    const itemCenter = rect.top + rect.height / 2;
    const distance = (itemCenter - viewportHeight / 2) / (viewportHeight + rect.height);
    const offset = clamp(distance * -strength * 2, -strength, strength);
    item.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
  });
};

let scrollTicking = false;

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? clamp(scrollTop / scrollable, 0, 1) : 0;

  header?.classList.toggle('is-scrolled', scrollTop > 18);
  if (progressBar) progressBar.style.width = `${progress * 100}%`;
  updateScrollEffects();
  scrollTicking = false;
};

const requestScrollUpdate = () => {
  if (scrollTicking) return;
  window.requestAnimationFrame(updateScrollUI);
  scrollTicking = true;
};

window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
  requestScrollUpdate();
});

updateScrollUI();

const revealElements = document.querySelectorAll('[data-reveal]');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .1, rootMargin: '0px 0px -6% 0px' });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const mediaElements = document.querySelectorAll('[data-media-reveal]');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  mediaElements.forEach((element) => element.classList.add('is-media-visible'));
} else {
  const mediaObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-media-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .18, rootMargin: '0px 0px -5% 0px' });

  mediaElements.forEach((element) => mediaObserver.observe(element));
}

const observedSections = [...document.querySelectorAll('main section[id]')];

if ('IntersectionObserver' in window && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('is-current', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { threshold: [.18, .38], rootMargin: '-16% 0px -58% 0px' });

  observedSections.forEach((section) => sectionObserver.observe(section));
}

const filterButtons = [...document.querySelectorAll('.filter-button')];
const projectCards = [...document.querySelectorAll('.project-card')];
const filterStatus = document.querySelector('.filter-status');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    let visibleCount = 0;
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      const shouldShow = selectedFilter === 'all' || categories.includes(selectedFilter);
      card.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    if (filterStatus) {
      filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'proyecto visible' : 'proyectos visibles'}.`;
    }

    requestScrollUpdate();
  });
});

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');

const copyText = async (value) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const temporaryInput = document.createElement('textarea');
  temporaryInput.value = value;
  temporaryInput.setAttribute('readonly', '');
  temporaryInput.style.position = 'fixed';
  temporaryInput.style.opacity = '0';
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  document.execCommand('copy');
  temporaryInput.remove();
};

copyButton?.addEventListener('click', async () => {
  try {
    await copyText(copyButton.dataset.email || 'veronicatorrejonm@gmail.com');
    copyButton.textContent = 'Email copiado';
    if (copyStatus) copyStatus.textContent = 'Listo: quedó copiado en tu portapapeles.';
    window.setTimeout(() => {
      copyButton.textContent = 'Copiar email';
      if (copyStatus) copyStatus.textContent = '';
    }, 2200);
  } catch {
    if (copyStatus) copyStatus.textContent = 'No fue posible copiarlo. Escríbeme a veronicatorrejonm@gmail.com.';
  }
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
