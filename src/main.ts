import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import './style.css';
import {
  applyLang,
  detectLang,
  readSavedLang,
  saveLang,
  type Lang,
} from './i18n';

// Language: pick on load, switch on click.
applyLang(document, detectLang(navigator.languages ?? [], readSavedLang()));

document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang as Lang;
    saveLang(lang);
    applyLang(document, lang);
  });
});

// Mobile menu: the button opens and closes the link list.
const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
const menu = document.getElementById('nav-menu');

function setMenu(open: boolean): void {
  toggle?.setAttribute('aria-expanded', String(open));
  menu?.classList.toggle('is-open', open);
}

toggle?.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

// Close after picking a link, or on Escape.
menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    toggle?.getAttribute('aria-expanded') === 'true'
  ) {
    setMenu(false);
    toggle.focus();
  }
});
