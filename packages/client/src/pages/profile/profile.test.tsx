import { render } from '@testing-library/react';
import { ProfilePage } from './profile';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../reduxstore/monopolyStore';

describe('Profile', () => {
  it('рендерится', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </Provider>
    );
    const title = getByText('Профиль');

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
