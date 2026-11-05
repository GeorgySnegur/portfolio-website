import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects', () => {
  it('every project has a title, summary and at least one tag', () => {
    for (const p of projects) {
      expect(p.title).not.toBe('');
      expect(p.summary).not.toBe('');
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it('links use https', () => {
    for (const p of projects) {
      if (p.link) expect(p.link.startsWith('https://')).toBe(true);
    }
  });
});
