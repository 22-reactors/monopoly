import { render, screen } from '@testing-library/react';
import Textarea from './textarea';

describe('Textarea', () => {
  it('рендерится', () => {
    render(<Textarea value="test" onChange={() => void 0} />);

    const component = screen.getByTestId('textarea');

    expect(component).toBeInTheDocument();
  });
});
