import { render, screen } from '@testing-library/react';
import { ThemeMessage } from './themeMessage';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../reduxstore/monopolyStore';

describe('ThemeMessage', () => {
  it('рендерится', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeMessage
            id={0}
            avatar={{ name: 'Igor' }}
            status="test"
            comment="Hello"
          />
        </MemoryRouter>
      </Provider>
    );

    const component = screen.getByTestId('theme-message');

    expect(component).toBeInTheDocument();
  });
});
