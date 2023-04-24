import { render } from '@testing-library/react';
import { Login } from './login';
import loginProps from '../../mocs/loginProps';
import { Provider } from 'react-redux';
import { store } from '../../reduxstore/monopolyStore';
import { MemoryRouter } from 'react-router-dom';

describe('Login', () => {
  it('рендерится', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login {...loginProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
