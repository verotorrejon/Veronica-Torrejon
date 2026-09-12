document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.primary-nav a')];
const progressBar = document.querySelector('.page-progress span');

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

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});

let scrollTicking = false;

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

  header?.classList.toggle('is-scrolled', scrollTop > 18);
  if (progressBar) progressBar.style.width = `${progress * 100}%`;
  scrollTicking = false;
};

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollUI);
    scrollTicking = true;
  }
}, { passive: true });

updateScrollUI();

const revealElements = document.querySelectorAll('[data-reveal]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  revealElements.forEach((element) => revealObserver.observe(element));
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
  }, { threshold: [0.22, 0.45], rootMargin: '-18% 0px -55% 0px' });

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
  });
});

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporaryInput = document.createElement('textarea');
  temporaryInput.value = text;
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
