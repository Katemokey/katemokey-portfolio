const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (header) {
  const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
}

if (menuButton && mobileNav) {
  function setMenuOpen(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }
  menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenuOpen(false)));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenuOpen(false); });
  window.matchMedia('(min-width: 821px)').addEventListener('change', e => { if (e.matches) setMenuOpen(false); });
}

document.getElementById('year').textContent = new Date().getFullYear();

// Situation navigator: activate one service while keeping all five in the HTML.
const practiceTabs = [...document.querySelectorAll('.practice-navigator-tab')];
if (practiceTabs.length) {
  function activatePracticeTab(nextTab, moveFocus = false) {
    practiceTabs.forEach((tab) => {
      const active = tab === nextTab;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.hidden = !active;
    });
    if (moveFocus) nextTab.focus();
  }
  practiceTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activatePracticeTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % practiceTabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + practiceTabs.length - 1) % practiceTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = practiceTabs.length - 1;
      else return;
      event.preventDefault();
      activatePracticeTab(practiceTabs[next], true);
    });
  });
}
