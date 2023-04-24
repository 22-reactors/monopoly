import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../reduxstore/monopolyStore';
import { MemoryRouter } from 'react-router-dom';
import { LoginButtons } from './login-buttons';
import { links } from '../../../utils/const';

describe('LoginButtons', () => {
  it('рендерит кнопки', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginButtons logoutText="Выйти" />
        </MemoryRouter>
      </Provider>
    );

    const component = screen.getByTestId('button-wrapper');
    const buttonSignIn = screen.getByText(links.login.title);
    const buttonSignUp = screen.getByText(links.signup.title);
    const linksPath = screen.getAllByRole('link');

    expect(component).toBeInTheDocument();

    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonSignUp).toBeInTheDocument();

    expect(linksPath).toHaveLength(2);
    expect(linksPath[0]).toHaveAttribute('href', links.login.path);
    expect(linksPath[1]).toHaveAttribute('href', links.signup.path);
  });
});
