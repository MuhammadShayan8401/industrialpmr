import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import App from '../src/App.jsx';

const publicFile = (src) => resolve(__dirname, '../public', src.replace(/^\//, ''));

describe('images and logos', () => {
  it('every <img> on the page points at a file in public/', () => {
    const { container } = render(<App />);
    const srcs = [...container.querySelectorAll('img')].map((i) => i.getAttribute('src'));
    expect(srcs).toEqual(['/assets/logo-full.svg', '/assets/laptop.png', '/assets/logo-full.svg']);
    for (const s of srcs) expect(existsSync(publicFile(s)), s).toBe(true);
  });

  it('favicon and font preload in index.html resolve to real files', async () => {
    const { readFileSync } = await import('node:fs');
    const html = readFileSync(resolve(__dirname, '../index.html'), 'utf8');
    const refs = [...html.matchAll(/href="(\/assets\/[^"]+)"/g)].map((m) => m[1]);
    expect(refs).toHaveLength(2);
    for (const r of refs) expect(existsSync(publicFile(r)), r).toBe(true);
  });
});
