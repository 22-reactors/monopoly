import { render, screen } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('рендерится', () => {
    render(<Input name="name" value="test" onChange={() => void 0} />);

    const component = screen.getByTestId('input');

    expect(component).toBeInTheDocument();
  });
});
