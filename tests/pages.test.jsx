import { render, screen } from '@testing-library/react';
import InfoPage, { pages } from '../src/pages/InfoPage.jsx';
import App from '../src/App.jsx';

describe.each(Object.keys(pages))('%s page', (key) => {
  it('shows the title, breadcrumb and body', () => {
    render(<InfoPage page={key} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(pages[key].title);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent(
      `Home›${pages[key].title}`
    );
    expect(screen.getByText(pages[key].text)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: pages[key].heading })).toBeInTheDocument();
    for (const para of pages[key].paragraphs ?? [])
      expect(screen.getByText(para)).toBeInTheDocument();
  });

  it('points header anchors and footer logo back to the landing page', () => {
    const { container } = render(<InfoPage page={key} />);
    expect(container.querySelector('.nav a[href="/#features"]')).not.toBeNull();
    expect(container.querySelector('.nav a[href="/#contact"]')).not.toBeNull();
    expect(container.querySelector('.flogo')).toHaveAttribute('href', '/');
  });
});

describe('footer support links', () => {
  it('link to the local pages on the landing page', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
    expect(screen.getByRole('link', { name: 'API Status' })).toHaveAttribute('href', '/api-status');
    expect(screen.getByRole('link', { name: /Terms/ })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
      'href',
      '/privacy'
    );
  });
});
