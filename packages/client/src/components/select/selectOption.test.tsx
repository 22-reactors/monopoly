import { render, screen } from '@testing-library/react';
import SelectOption from './selectOption';

describe('SelectOption', () => {
  it('рендерится', () => {
    render(<SelectOption label="test" value="0" />);

    const component = screen.getByTestId('select-option');

    expect(component).toBeInTheDocument();
  });
});
