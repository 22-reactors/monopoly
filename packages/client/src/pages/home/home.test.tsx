import { render } from '@testing-library/react';
import { Home } from './home';
import { homeProps } from '../../mocs/homeProps';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../reduxstore/monopolyStore';

describe('Home', () => {
  it('рендерится', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home {...homeProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
