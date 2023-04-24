import { render, screen } from '@testing-library/react';

import Home from './Home';

describe('Home', () => {
  test('Renders Home', () => {
    render(<Home />);
    // screen.debug();
    expect(screen.getByRole('heading').textContent).toBe('Deriv Assignment');
  });
});
