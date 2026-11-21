// Simple two-language setup. English text lives in index.html, so the page
// works without JavaScript. This file swaps text in and out by key.

export type Lang = 'en' | 'de';

export const LANGS: Lang[] = ['en', 'de'];

const STORAGE_KEY = 'lang';

type Dict = Record<string, string>;

export const strings: Record<Lang, Dict> = {
  en: {
    'meta.title': 'Georgy Snegur - Web Developer',
    'meta.description':
      'Georgy Snegur, web developer and student at FH Salzburg. I build websites that work and automate the rest.',
    'nav.skip': 'Skip to content',
    'nav.home': 'Georgy Snegur, back to top',
    'nav.menu': 'Menu',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.langGroup': 'Language',
    'hero.label': '01 / INTRO',
    'hero.role': 'Web Developer',
    'hero.tagline': 'I build things that work - and automate the rest.',
  },
  de: {
    'meta.title': 'Georgy Snegur - Webentwickler',
    'meta.description':
      'Georgy Snegur, Webentwickler und Student an der FH Salzburg. Ich baue Websites, die funktionieren, und automatisiere den Rest.',
    'nav.skip': 'Zum Inhalt springen',
    'nav.home': 'Georgy Snegur, nach oben',
    'nav.menu': 'Menü',
    'nav.about': 'Über mich',
    'nav.projects': 'Projekte',
    'nav.skills': 'Skills',
    'nav.contact': 'Kontakt',
    'nav.langGroup': 'Sprache',
    'hero.label': '01 / INTRO',
    'hero.role': 'Webentwickler',
    'hero.tagline':
      'Ich baue Dinge, die funktionieren - und automatisiere den Rest.',
  },
};

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'de';
}

// Order of priority: a choice the visitor made before, then the browser
// language list, then English.
export function detectLang(
  browserLangs: readonly string[],
  saved: string | null,
): Lang {
  if (isLang(saved)) return saved;
  for (const tag of browserLangs) {
    const base = tag.toLowerCase().split('-')[0];
    if (isLang(base)) return base;
  }
  return 'en';
}

export function readSavedLang(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage can be blocked (private mode). The switch still works for this visit.
  }
}

// data-i18n="key"                 -> replaces the text
// data-i18n-attr="attr:key;..."   -> replaces attributes
export function applyLang(root: Document, lang: Lang): void {
  const dict = strings[lang];

  root.documentElement.lang = lang;
  root.title = dict['meta.title'];

  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const text = dict[el.dataset.i18n!];
    if (text !== undefined) el.textContent = text;
  });

  root.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    for (const pair of el.dataset.i18nAttr!.split(';')) {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      const text = dict[key];
      if (attr && text !== undefined) el.setAttribute(attr, text);
    }
  });

  root.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });
}
