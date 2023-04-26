import { render, screen } from '@testing-library/react';
import { Paginator } from './paginator';

describe('Paginator', () => {
  it('рендерится', () => {
    render(<Paginator pagesCount={1} />);

    const component = screen.getByTestId('paginator');

    expect(component).toBeInTheDocument();
  });
});
