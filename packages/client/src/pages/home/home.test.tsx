import { render } from '@testing-library/react';
import { Home } from './home';
import { homeProps } from '../../mocs/homeProps';
import { MemoryRouter } from 'react-router-dom';

describe('Home', () => {
  it('рендерится', () => {
    const { container } = render(
      <MemoryRouter>
        <Home {...homeProps} />
      </MemoryRouter>
    );

    expect(container).toBeInTheDocument();
  });
});
