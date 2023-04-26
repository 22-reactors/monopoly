import { render, screen } from '@testing-library/react';
import InputFieldSet from './InputFieldSet';

describe('InputFieldSet', () => {
  it('рендерится', () => {
    render(<InputFieldSet fieldId="0" fieldName="name" inputType="text" />);

    const component = screen.getByTestId('fieldset');
    expect(component).toBeInTheDocument();
  });
});
