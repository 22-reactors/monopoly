import { render } from '@testing-library/react';
import { Register } from './register';
import RegistrProps from '../../mocs/registrProps';
import { Provider } from 'react-redux';
import { store } from '../../reduxstore/monopolyStore';
import { MemoryRouter } from 'react-router-dom';

describe('Register', () => {
  it('рендерится', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Register {...RegistrProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
