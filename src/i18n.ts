// Simple two-language setup. English text lives in the HTML files, so the
// pages work without JavaScript. This file swaps text in and out by key.

export type Lang = 'en' | 'de';

export const LANGS: Lang[] = ['en', 'de'];

const STORAGE_KEY = 'lang';

type Dict = Record<string, string>;

export const strings: Record<Lang, Dict> = {
  en: {
    // Main page
    'meta.title': 'Georgy Snegur - Web Developer',
    'meta.description':
      'Georgy Snegur, web developer and student at FH Salzburg. I make it work. Then I make it work on its own.',
    'nav.skip': 'Skip to content',
    'nav.home': 'GS - Georgy Snegur, back to top',
    'nav.homePage': 'GS - Georgy Snegur, home page',
    'nav.menu': 'Menu',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.langGroup': 'Language',
    'hero.role': 'Web Developer',
    'about.label': 'About',
    'about.text':
      'Student at FH Salzburg, studying Code and Interactive Systems. Background in 3D and animation - now focused on web development, automation, and WebOps. Looking for a mandatory internship (Pflichtpraktikum) starting July 2027.',
    'projects.label': 'Projects',
    'projects.gina.text':
      'Artist website. Migrated the site from Joomla to a custom PHP codebase and built a self-contained, bilingual (DE/EN) content management system, so the non-technical client can edit every page without touching code.',
    'projects.gina.point1':
      'CMS with session-based auth, CSRF protection on all forms, an XSS-safe rich-text whitelist, atomic file writes with timestamped backups, and an automated image pipeline (GD, WebP conversion and resizing).',
    'projects.gina.point2':
      'Full workflow end to end: Git/GitHub over SSH and a byte-verified content migration.',
    'projects.inksync.text':
      'Storyboard generator. You upload a script, the app splits it into scenes, generates an image for each scene through the Replicate API and lays them out as panels you can export. Plain PHP, no framework.',
    'projects.infra.text':
      'The VPS that runs this portfolio and my automation tools. Key-only SSH with restricted users, Caddy as reverse proxy with Cloudflare Origin certificates, CI/CD with GitHub Actions (typecheck, test, build, deploy over rsync), Docker Compose to keep services apart, and separate users (ops, agent, deploy) with only the rights each one needs.',
    'projects.tag.ai': 'AI',
    'skills.label': 'Skills',
    'skills.webops': 'WebOps & Automation',
    'contact.title': 'Get in touch',
    'contact.text': 'Open to opportunities starting July 2027.',
    'contact.email': 'Email',
    'contact.cv': 'Download CV',
    'contact.cvFile': '/georgy-snegur-cv-en.pdf',

    // Shared on project pages
    'detail.back': '← Back to overview',
    'detail.stack': 'Tech stack',
    'detail.learned': 'What I learned',

    // InkSync page
    'inksync.meta.title': 'InkSync - Georgy Snegur',
    'inksync.meta.description':
      'InkSync: a storyboard generator in plain PHP. Upload a script, get image panels generated through the Replicate API.',
    'inksync.lead':
      'InkSync turns a written script into a storyboard. You upload the script, the app splits it into scenes, generates an image for each scene through the Replicate API and lays the images out as panels. The finished storyboard can be exported.',
    'inksync.how': 'How it works',
    'inksync.how1':
      'Upload: the script comes in as a file. The server checks type and size before anything else happens.',
    'inksync.how2':
      'Parsing: the script is split into scenes, and each scene becomes a short image prompt.',
    'inksync.how3':
      'Image generation: each prompt goes to an image model on Replicate. An image takes a few seconds, so the job runs asynchronously and the app waits for the result.',
    'inksync.how4':
      'Storage: finished images are saved on the server, served from there and deleted when they are no longer needed.',
    'inksync.how5':
      'Layout and export: the panels are put in order as a storyboard and can be exported.',
    'inksync.stack1':
      'PHP without a framework: routing, file uploads and validation written by hand.',
    'inksync.stack2':
      'Replicate API: hosted image models, called over HTTP with an API key that stays on the server.',
    'inksync.learned1':
      'First time working with an external AI API (Replicate): handling requests and responses, storing API keys safely, dealing with rate limits.',
    'inksync.learned2':
      'Polling vs. webhooks for asynchronous image generation: webhooks scale better, polling is easier to debug.',
    'inksync.learned3':
      'PHP without a framework: my own routing, file uploads and validation. After that you know what Laravel does for you.',
    'inksync.learned4':
      'Managing images on the server: storing generated panels, cleaning them up and serving them correctly.',

    // Infra page
    'infra.meta.title': 'VPS Automation Stack - Georgy Snegur',
    'infra.meta.description':
      'The self-hosted server behind this portfolio: SSH hardening, Caddy, Cloudflare, CI/CD with GitHub Actions, Docker and separate users.',
    'infra.lead':
      'This portfolio runs on a rented Linux VPS that I set up and maintain myself, together with my automation tools. Everything on it is done over SSH: access, web server, deployment, containers and user rights.',
    'infra.flow': 'How a change gets online',
    'infra.flowText':
      'My PC\n  │  git push\n  ▼\nGitHub\n  │\n  ▼\nGitHub Actions   typecheck, format check, tests, build\n  │  only on main, only if every check passes\n  ▼\nrsync over SSH   user "deploy", one folder only\n  │\n  ▼\nVPS\n  │\n  ▼\nCaddy            serves the files over HTTPS\n  │\n  ▼\nCloudflare       proxy in front of the server\n  │\n  ▼\nVisitor',
    'infra.parts': 'The building blocks',
    'infra.ssh': 'SSH hardening',
    'infra.sshText':
      'Login only with SSH keys, passwords are turned off. AllowUsers limits who can log in at all. The deploy user is locked to rrsync, so its key can copy files into one folder and nothing else.',
    'infra.caddy': 'Caddy and Cloudflare',
    'infra.caddyText':
      'Caddy is the web server and reverse proxy. It uses a Cloudflare Origin certificate instead of Let’s Encrypt, because with the Cloudflare proxy on, the Let’s Encrypt checks have to get through Cloudflare first and issuing or renewing breaks easily. Visitors only ever talk to Cloudflare, and Cloudflare checks the Origin certificate (SSL mode Full strict). Caddy also sets the security headers, including a strict Content Security Policy.',
    'infra.cicd': 'CI/CD',
    'infra.cicdText':
      'Every push runs a GitHub Actions pipeline: typecheck, format check, tests and build. Only on main and only when everything passes, a second job copies the build to the server with rsync. If one check fails, nothing gets deployed.',
    'infra.docker': 'Docker',
    'infra.dockerText':
      'The automation tools run in Docker containers, set up with Docker Compose. Each service has its own environment and can be updated or restarted without touching the rest.',
    'infra.users': 'User isolation',
    'infra.usersText':
      'Each job has its own Linux user: ops for administration, agent for development work, deploy only for uploading the site, and caddy for the web server. Every user has only the rights it needs, so one leaked key or one broken service does not open up the whole server.',
    'infra.learned1':
      'The Linux user and permission model in practice: why one user per service makes sense (ops, agent, deploy, caddy).',
    'infra.learned2':
      'SSH hardening: key-only auth, AllowUsers, rrsync for restricted access.',
    'infra.learned3':
      'Reverse proxy setup: Caddy with Cloudflare Origin certificates, and why Let’s Encrypt behind the Cloudflare proxy does not work well.',
    'infra.learned4':
      'CI/CD from scratch: a GitHub Actions pipeline that only deploys when all checks are green.',
    'infra.learned5':
      'Debugging a server without a GUI: everything over SSH, logs and systemctl.',
  },
  de: {
    // Main page
    'meta.title': 'Georgy Snegur - Webentwickler',
    'meta.description':
      'Georgy Snegur, Webentwickler und Student an der FH Salzburg. I make it work. Then I make it work on its own.',
    'nav.skip': 'Zum Inhalt springen',
    'nav.home': 'GS - Georgy Snegur, nach oben',
    'nav.homePage': 'GS - Georgy Snegur, zur Startseite',
    'nav.menu': 'Menü',
    'nav.about': 'Über mich',
    'nav.projects': 'Projekte',
    'nav.skills': 'Skills',
    'nav.contact': 'Kontakt',
    'nav.langGroup': 'Sprache',
    'hero.role': 'Webentwickler',
    'about.label': 'Über mich',
    'about.text':
      'Student an der FH Salzburg im Studiengang Code and Interactive Systems. Hintergrund in 3D und Animation - jetzt mit Fokus auf Webentwicklung, Automatisierung und WebOps. Ich suche ein Pflichtpraktikum ab Juli 2027.',
    'projects.label': 'Projekte',
    'projects.gina.text':
      'Website einer Künstlerin. Die Seite von Joomla auf eine eigene PHP-Codebasis migriert und ein eigenständiges, zweisprachiges (DE/EN) Content-Management-System gebaut, damit jede Seite ohne Programmierkenntnisse bearbeitet werden kann.',
    'projects.gina.point1':
      'CMS mit sessionbasierter Anmeldung, CSRF-Schutz für alle Formulare, XSS-sicherer Rich-Text-Whitelist, atomaren Dateischreibvorgängen mit Backups samt Zeitstempel und automatischer Bildverarbeitung (GD, WebP-Konvertierung und Skalierung).',
    'projects.gina.point2':
      'Gesamter Ablauf in eigener Hand: Git/GitHub über SSH und eine byte-genau geprüfte Migration der Inhalte.',
    'projects.inksync.text':
      'Storyboard-Generator. Man lädt ein Drehbuch hoch, die App teilt es in Szenen, erzeugt für jede Szene ein Bild über die Replicate API und ordnet die Bilder als Panels an, die sich exportieren lassen. Reines PHP, kein Framework.',
    'projects.infra.text':
      'Der VPS, auf dem dieses Portfolio und meine Automatisierungs-Tools laufen. SSH nur mit Schlüssel und eingeschränkten Usern, Caddy als Reverse Proxy mit Cloudflare-Origin-Zertifikaten, CI/CD mit GitHub Actions (Typecheck, Tests, Build, Deploy über rsync), Docker Compose zur Trennung der Dienste und getrennte User (ops, agent, deploy) mit jeweils nur den nötigen Rechten.',
    'projects.tag.ai': 'KI',
    'skills.label': 'Skills',
    'skills.webops': 'WebOps & Automatisierung',
    'contact.title': 'Kontakt aufnehmen',
    'contact.text': 'Offen für Möglichkeiten ab Juli 2027.',
    'contact.email': 'E-Mail',
    'contact.cv': 'Lebenslauf herunterladen',
    'contact.cvFile': '/georgy-snegur-cv-de.pdf',

    // Shared on project pages
    'detail.back': '← Zurück zur Übersicht',
    'detail.stack': 'Tech Stack',
    'detail.learned': 'Was ich gelernt habe',

    // InkSync page
    'inksync.meta.title': 'InkSync - Georgy Snegur',
    'inksync.meta.description':
      'InkSync: ein Storyboard-Generator in reinem PHP. Drehbuch hochladen, Bild-Panels über die Replicate API erzeugen lassen.',
    'inksync.lead':
      'InkSync macht aus einem Drehbuch ein Storyboard. Man lädt das Drehbuch hoch, die App teilt es in Szenen, erzeugt für jede Szene ein Bild über die Replicate API und ordnet die Bilder als Panels an. Das fertige Storyboard lässt sich exportieren.',
    'inksync.how': 'So funktioniert es',
    'inksync.how1':
      'Upload: das Drehbuch kommt als Datei. Der Server prüft zuerst Dateityp und Größe.',
    'inksync.how2':
      'Parsing: das Drehbuch wird in Szenen geteilt, aus jeder Szene wird ein kurzer Bild-Prompt.',
    'inksync.how3':
      'Bilderzeugung: jeder Prompt geht an ein Bildmodell auf Replicate. Ein Bild dauert ein paar Sekunden, deshalb läuft der Auftrag asynchron und die App wartet auf das Ergebnis.',
    'inksync.how4':
      'Speichern: fertige Bilder werden auf dem Server abgelegt, von dort ausgeliefert und gelöscht, wenn sie nicht mehr gebraucht werden.',
    'inksync.how5':
      'Layout und Export: die Panels werden der Reihe nach als Storyboard angeordnet und lassen sich exportieren.',
    'inksync.stack1':
      'PHP ohne Framework: Routing, Datei-Uploads und Validierung selbst geschrieben.',
    'inksync.stack2':
      'Replicate API: gehostete Bildmodelle, per HTTP angesprochen, der API Key bleibt auf dem Server.',
    'inksync.learned1':
      'Erste Erfahrung mit einer externen AI API (Replicate): Request/Response Handling, API Keys sicher speichern, mit Rate Limits umgehen.',
    'inksync.learned2':
      'Polling vs. Webhooks für asynchrone Bildgenerierung: Webhooks skalieren besser, Polling ist einfacher zu debuggen.',
    'inksync.learned3':
      'PHP ohne Framework: eigenes Routing, eigene File-Uploads, eigene Validierung. Danach versteht man, was Laravel einem abnimmt.',
    'inksync.learned4':
      'Bilder serverseitig verwalten: generierte Panels speichern, aufräumen und richtig ausliefern.',

    // Infra page
    'infra.meta.title': 'VPS Automation Stack - Georgy Snegur',
    'infra.meta.description':
      'Der selbst betriebene Server hinter diesem Portfolio: SSH Hardening, Caddy, Cloudflare, CI/CD mit GitHub Actions, Docker und getrennte User.',
    'infra.lead':
      'Dieses Portfolio läuft auf einem gemieteten Linux-VPS, den ich selbst eingerichtet habe und betreue, zusammen mit meinen Automatisierungs-Tools. Alles darauf passiert über SSH: Zugang, Webserver, Deployment, Container und Benutzerrechte.',
    'infra.flow': 'Wie eine Änderung online geht',
    'infra.flowText':
      'Mein PC\n  │  git push\n  ▼\nGitHub\n  │\n  ▼\nGitHub Actions   Typecheck, Format-Check, Tests, Build\n  │  nur auf main, nur wenn alle Checks grün sind\n  ▼\nrsync über SSH   User "deploy", nur ein Ordner\n  │\n  ▼\nVPS\n  │\n  ▼\nCaddy            liefert die Dateien über HTTPS aus\n  │\n  ▼\nCloudflare       Proxy vor dem Server\n  │\n  ▼\nBesucher',
    'infra.parts': 'Die Bausteine',
    'infra.ssh': 'SSH Hardening',
    'infra.sshText':
      'Login nur mit SSH-Schlüssel, Passwörter sind abgeschaltet. AllowUsers legt fest, wer sich überhaupt anmelden darf. Der Deploy-User ist auf rrsync beschränkt: sein Schlüssel kann Dateien in einen Ordner kopieren und sonst nichts.',
    'infra.caddy': 'Caddy und Cloudflare',
    'infra.caddyText':
      'Caddy ist Webserver und Reverse Proxy. Statt Let’s Encrypt nutzt er ein Cloudflare-Origin-Zertifikat, denn mit aktivem Cloudflare-Proxy müssen die Let’s-Encrypt-Prüfungen erst durch Cloudflare durch, und Ausstellen oder Erneuern scheitert schnell. Besucher sprechen immer nur mit Cloudflare, und Cloudflare prüft das Origin-Zertifikat (SSL-Modus Full strict). Caddy setzt außerdem die Security Header, inklusive einer strengen Content Security Policy.',
    'infra.cicd': 'CI/CD',
    'infra.cicdText':
      'Jeder Push startet eine GitHub-Actions-Pipeline: Typecheck, Format-Check, Tests und Build. Nur auf main und nur wenn alles grün ist, kopiert ein zweiter Job den Build per rsync auf den Server. Schlägt ein Check fehl, wird nichts deployed.',
    'infra.docker': 'Docker',
    'infra.dockerText':
      'Die Automatisierungs-Tools laufen in Docker-Containern, eingerichtet mit Docker Compose. Jeder Dienst hat seine eigene Umgebung und lässt sich updaten oder neu starten, ohne den Rest anzufassen.',
    'infra.users': 'Getrennte User',
    'infra.usersText':
      'Jede Aufgabe hat ihren eigenen Linux-User: ops für die Administration, agent für die Entwicklung, deploy nur für den Upload der Seite und caddy für den Webserver. Jeder User hat nur die Rechte, die er braucht. Ein geleakter Schlüssel oder ein kaputter Dienst öffnet so nicht gleich den ganzen Server.',
    'infra.learned1':
      'Das Linux User/Permission Model in der Praxis: warum ein eigener User pro Dienst sinnvoll ist (ops, agent, deploy, caddy).',
    'infra.learned2':
      'SSH Hardening: nur Key-Auth, AllowUsers, rrsync für eingeschränkten Zugriff.',
    'infra.learned3':
      'Reverse Proxy Setup: Caddy mit Cloudflare-Origin-Zertifikaten, und warum Let’s Encrypt hinter dem Cloudflare-Proxy nicht gut funktioniert.',
    'infra.learned4':
      'CI/CD von Null aufgebaut: eine GitHub-Actions-Pipeline, die nur bei grünen Checks deployed.',
    'infra.learned5':
      'Debugging auf dem Server ohne GUI: alles über SSH, Logs und systemctl.',
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
// <html data-i18n-title="key">    -> page title key (default: meta.title)
export function applyLang(root: Document, lang: Lang): void {
  const dict = strings[lang];
  const titleKey = root.documentElement.dataset.i18nTitle ?? 'meta.title';

  root.documentElement.lang = lang;
  root.title = dict[titleKey] ?? root.title;

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
