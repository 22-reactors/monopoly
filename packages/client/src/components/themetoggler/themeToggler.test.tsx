import { render, screen } from '@testing-library/react';
import Themetoggler from './index';

describe('ThemeToggler', () => {
  it('рендерится', () => {
    render(<Themetoggler children={[<div></div>]} />);

    const component = screen.getByTestId('theme-toggler');

    expect(component).toBeInTheDocument();
  });
});
