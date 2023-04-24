import { fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonVariation } from './button';
import { act } from 'react-dom/test-utils';

const PRIMARY_CLASS = 'btn_primary';
const OUTLINED_CLASS = 'btn_outlined';

describe('Button', () => {
  it('рендерится с вариацией primary', () => {
    render(<Button variation={ButtonVariation.PRIMARY} />);

    const component = screen.getByRole('button');
    expect(component).toHaveClass(PRIMARY_CLASS);
    expect(component).not.toHaveClass(OUTLINED_CLASS);
    expect(component).toBeInTheDocument();
  });

  it('рендерится с вариацией outlined', () => {
    render(<Button variation={ButtonVariation.OUTLINED} />);

    const component = screen.getByRole('button');
    expect(component).not.toHaveClass(PRIMARY_CLASS);
    expect(component).toHaveClass(OUTLINED_CLASS);
    expect(component).toBeInTheDocument();
  });

  it('рендерится с type submit', () => {
    render(<Button variation={ButtonVariation.PRIMARY} type="submit" />);

    const component = screen.getByRole('button');
    expect(component).toHaveAttribute('type', 'submit');
    expect(component).not.toHaveAttribute('type', 'button');
  });

  it('рендерится с атрибутом disabled', () => {
    render(<Button variation={ButtonVariation.PRIMARY} disabled />);

    const component = screen.getByRole('button');
    expect(component).toHaveAttribute('disabled', '');
  });

  it('срабатывает click', () => {
    const handler = jest.fn();
    render(<Button variation={ButtonVariation.PRIMARY} onClick={handler} />);

    const component = screen.getByRole('button');

    act(() => {
      fireEvent.click(component);
    })

    expect(handler).toBeCalled();
    expect(handler).toBeCalledTimes(1);
  });
});
