import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { Provider } from 'react-redux';
import { store } from '../../reduxstore/monopolyStore';
import { MemoryRouter } from 'react-router-dom';

describe('Footer', () => {
  it('рендерится', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Footer
            navTitle="title"
            navLinks={[{ title: 'titleLink', path: '/title' }]}
            infoText={['текст', 'инфо']}
            isDarkTheme={false}
          />
        </MemoryRouter>
      </Provider>
    );

    const component = screen.getByRole('contentinfo');
    expect(component).toBeInTheDocument();
  });
});
