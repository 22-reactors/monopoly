import { render } from '@testing-library/react';
import { GameSetup } from './gameSetup';
import { Provider } from 'react-redux';
import { store } from '../../reduxstore/monopolyStore';
import { MemoryRouter } from 'react-router-dom';

describe('GameSetup', () => {
  it('рендерится', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <GameSetup maxPlayers={4} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
