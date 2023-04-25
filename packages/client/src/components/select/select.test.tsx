import { render, screen } from '@testing-library/react';
import Select from './select';

describe('Select', () => {
  it('рендерится', () => {
    render(<Select name="test" />);

    const component = screen.getByRole('button');

    expect(component).toBeInTheDocument();
  });
});
