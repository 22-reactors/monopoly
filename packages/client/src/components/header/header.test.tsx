import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { headerProps } from '../../mocs/headerProps';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../reduxstore/monopolyStore';

describe('Header', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header {...headerProps} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('рендерится', () => {
    const component = screen.getByTestId('header');

    expect(component).toBeInTheDocument();
  });

  it('рендерятся ссылки', () => {
    const list = screen.getByRole('list');

    expect(list.children).toHaveLength(headerProps.navLinks.length);
  });
});
