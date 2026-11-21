import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { detectLang, strings } from './i18n';

const html = readFileSync(
  resolve(import.meta.dirname, '../index.html'),
  'utf8',
);

function keysUsedInHtml(): string[] {
  const keys = new Set<string>();
  for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) keys.add(m[1]);
  for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
    for (const pair of m[1].split(';')) keys.add(pair.split(':')[1].trim());
  }
  return [...keys];
}

describe('translations', () => {
  it('English and German have the same keys', () => {
    expect(Object.keys(strings.de).sort()).toEqual(
      Object.keys(strings.en).sort(),
    );
  });

  it('every key used in index.html exists', () => {
    for (const key of keysUsedInHtml()) {
      expect(strings.en, key).toHaveProperty([key]);
      expect(strings.de, key).toHaveProperty([key]);
    }
  });

  it('no text uses the long dash (house rule)', () => {
    const all = [
      html,
      ...Object.values(strings.en),
      ...Object.values(strings.de),
    ];
    for (const text of all) expect(text).not.toMatch(/[–—]/);
  });
});

describe('detectLang', () => {
  it('uses a saved choice first', () => {
    expect(detectLang(['de-AT'], 'en')).toBe('en');
  });

  it('falls back to the browser language list', () => {
    expect(detectLang(['de-AT', 'en'], null)).toBe('de');
    expect(detectLang(['fr-FR', 'de'], null)).toBe('de');
    expect(detectLang(['en-GB'], null)).toBe('en');
  });

  it('defaults to English', () => {
    expect(detectLang(['fr', 'it'], null)).toBe('en');
    expect(detectLang([], 'xx')).toBe('en');
  });
});

describe('links', () => {
  it('external links use https', () => {
    for (const m of html.matchAll(/href="(http[^"]*)"/g)) {
      expect(m[1].startsWith('https://')).toBe(true);
    }
  });
});
