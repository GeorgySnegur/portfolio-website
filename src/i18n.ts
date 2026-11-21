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
    'nav.home': 'GS - Georgy Snegur, back to top',
    'nav.menu': 'Menu',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.langGroup': 'Language',
    'hero.label': '01 / INTRO',
    'hero.role': 'Web Developer',
    'hero.tagline': 'I build things that work - and automate the rest.',
    'about.label': 'About',
    'about.text':
      'Student at FH Salzburg, studying Code and Interactive Systems. Background in 3D and animation - now focused on web development, automation, and DevOps. Looking for a mandatory internship (Pflichtpraktikum) starting July 2027.',
    'projects.label': 'Work',
    'projects.gina.text':
      'Artist website. Migrated the site from Joomla to a custom PHP codebase and built a self-contained, bilingual (DE/EN) content management system, so the non-technical client can edit every page without touching code.',
    'projects.gina.point1':
      'CMS with session-based auth, CSRF protection on all forms, an XSS-safe rich-text whitelist, atomic file writes with timestamped backups, and an automated image pipeline (GD, WebP conversion and resizing).',
    'projects.gina.point2':
      'Full workflow end to end: Git/GitHub over SSH, FTP deployment, and a byte-verified content migration.',
    'projects.inksync.text':
      'AI-powered storyboard generator. Upload a script, get visual panels.',
    'projects.tag.ai': 'AI',
    'skills.label': 'Skills',
    'skills.devops': 'DevOps & Automation',
    'contact.label': 'Contact',
    'contact.title': 'Get in touch',
    'contact.text': 'Open to opportunities starting July 2027.',
    'contact.email': 'Email',
    'contact.cv': 'Download CV',
  },
  de: {
    'meta.title': 'Georgy Snegur - Webentwickler',
    'meta.description':
      'Georgy Snegur, Webentwickler und Student an der FH Salzburg. Ich baue Websites, die funktionieren, und automatisiere den Rest.',
    'nav.skip': 'Zum Inhalt springen',
    'nav.home': 'GS - Georgy Snegur, nach oben',
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
    'about.label': 'Über mich',
    'about.text':
      'Student an der FH Salzburg im Studiengang Code and Interactive Systems. Hintergrund in 3D und Animation - jetzt mit Fokus auf Webentwicklung, Automatisierung und DevOps. Ich suche ein Pflichtpraktikum ab Juli 2027.',
    'projects.label': 'Projekte',
    'projects.gina.text':
      'Website einer Künstlerin. Die Seite von Joomla auf eine eigene PHP-Codebasis migriert und ein eigenständiges, zweisprachiges (DE/EN) Content-Management-System gebaut, damit jede Seite ohne Programmierkenntnisse bearbeitet werden kann.',
    'projects.gina.point1':
      'CMS mit sessionbasierter Anmeldung, CSRF-Schutz für alle Formulare, XSS-sicherer Rich-Text-Whitelist, atomaren Dateischreibvorgängen mit Backups samt Zeitstempel und automatischer Bildverarbeitung (GD, WebP-Konvertierung und Skalierung).',
    'projects.gina.point2':
      'Gesamter Ablauf in eigener Hand: Git/GitHub über SSH, FTP-Deployment und eine byte-genau geprüfte Migration der Inhalte.',
    'projects.inksync.text':
      'KI-gestützter Storyboard-Generator. Drehbuch hochladen, Bild-Panels erhalten.',
    'projects.tag.ai': 'KI',
    'skills.label': 'Skills',
    'skills.devops': 'DevOps & Automatisierung',
    'contact.label': 'Kontakt',
    'contact.title': 'Kontakt aufnehmen',
    'contact.text': 'Offen für Möglichkeiten ab Juli 2027.',
    'contact.email': 'E-Mail',
    'contact.cv': 'Lebenslauf herunterladen',
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
