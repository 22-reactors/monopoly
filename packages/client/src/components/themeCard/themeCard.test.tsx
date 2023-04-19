import { render, screen } from '@testing-library/react';
import { ThemeCard } from './themeCard';
import { MemoryRouter } from 'react-router-dom';

describe('ThemeCard', () => {
  it('рендерится', () => {
    render(
      <MemoryRouter>
        <ThemeCard
          title="test"
          avatar={{ name: 'Igor' }}
          description="Lorem"
          amountAnswer={2}
        />
      </MemoryRouter>
    );

    const component = screen.getByTestId('theme-card');

    expect(component).toBeInTheDocument();
  });
});
