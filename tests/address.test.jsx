import { render, screen, within } from '@testing-library/react';
import App from '../src/App.jsx';

describe('address section and footer', () => {
  it('shows the address and a map iframe before the footer', () => {
    const { container } = render(<App />);
    const section = container.querySelector('#address');
    expect(within(section).getByText(/Amber Estate Extension/)).toBeInTheDocument();
    expect(within(section).getByText(/Karachi 75400/)).toBeInTheDocument();
    const map = within(section).getByTitle(/Map showing the industrialpmr office/);
    expect(map.getAttribute('src')).toContain('google.com/maps');
    expect(map.getAttribute('src')).toContain("maps/embed");
    expect(section.compareDocumentPosition(container.querySelector('footer')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('footer no longer lists address or phone numbers', () => {
    const { container } = render(<App />);
    const footer = container.querySelector('footer');
    expect(within(footer).queryByRole('heading', { name: 'Address' })).toBeNull();
    expect(within(footer).queryByRole('heading', { name: 'Contact' })).toBeNull();
    expect(footer.textContent).not.toMatch(/Amber Estate/);
    expect(footer.querySelector('a[href^="tel:"]')).toBeNull();
  });

  it('puts info@kunjisoft.com under "Powered by"', () => {
    const { container } = render(<App />);
    const powered = container.querySelector('.footer__powered');
    expect(within(powered).getByRole('link', { name: 'info@kunjisoft.com' })).toHaveAttribute('href', 'mailto:info@kunjisoft.com');
  });
});
