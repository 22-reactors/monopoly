import { render, screen } from '@testing-library/react';
import { ThemeMessage } from './themeMessage';
import { MemoryRouter } from 'react-router-dom';

describe('ThemeMessage', () => {
  it('рендерится', () => {
    render(
      <MemoryRouter>
        <ThemeMessage avatar={{ name: 'Igor' }} status="test" message="Hello" />
      </MemoryRouter>
    );

    const component = screen.getByTestId('theme-message');

    expect(component).toBeInTheDocument();
  });
});
