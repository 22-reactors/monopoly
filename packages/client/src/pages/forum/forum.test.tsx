import { render } from '@testing-library/react';
import { Forum } from './forum';
import { MemoryRouter } from 'react-router-dom';

describe('Forum', () => {
  it('рендерится', () => {
    const { container } = render(
      <MemoryRouter>
        <Forum />
      </MemoryRouter>
    );

    expect(container).toBeInTheDocument();
  });
});
