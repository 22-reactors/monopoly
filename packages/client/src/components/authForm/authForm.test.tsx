import { render, screen } from '@testing-library/react';
import { AuthForm, IAuthFormProps } from './authForm';
import { MemoryRouter } from 'react-router-dom';

describe('AuthForm', () => {
  const formActionMock = jest.fn();
  const Component = (
    props?: Omit<IAuthFormProps, 'title' | 'formAction' | 'submitBtnName'>
  ) => (
    <AuthForm
      {...props}
      title="Форма"
      formAction={formActionMock}
      submitBtnName="Кнопка"
    />
  );

  it('отрендерен', () => {
    render(<Component />);

    const component = screen.getByText('Форма');
    expect(component).toBeInTheDocument();
  });

  it('отрендерен с текстом ошибки', () => {
    render(<Component errorTitle="Ошибка" />);

    const element = screen.getByTestId('error-text');
    expect(element).toHaveTextContent('Ошибка');
  });

  it('содержит кнопку отправки', () => {
    render(<Component />);

    const element = screen.getByRole('button');
    expect(element).toHaveTextContent('Кнопка');
  });

  it('дизейблит кнопку формы, если передан текст ошибки', () => {
    render(<Component errorTitle="Ошибка" />);

    const element = screen.getByRole('button');
    expect(element).toBeDisabled();
  });

  it('содержит ссылку', () => {
    render(
      <MemoryRouter>
        <Component linkPath="/" linkName="Ссылка" />
      </MemoryRouter>
    );

    const element = screen.getByRole('link');
    expect(element).toHaveAttribute('href', '/');
  });

  it('не содержит ссылку', () => {
    render(
      <MemoryRouter>
        <Component linkName="Ссылка" />
      </MemoryRouter>
    );

    const element = screen.queryByText('link');
    expect(element).not.toBeInTheDocument();
  });
});
