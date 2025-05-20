import { render, screen } from '@testing-library/react';
import App from '../App';

test('načte hlavní aplikaci bez chyb', () => {
  render(<App />);
  expect(screen.getByText(/hex/i)).toBeInTheDocument();
});