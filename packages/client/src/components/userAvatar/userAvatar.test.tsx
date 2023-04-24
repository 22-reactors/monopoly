import { render, screen } from '@testing-library/react';
import { UserAvatar } from './userAvatar';
import { MemoryRouter } from 'react-router-dom';

describe('UserAvatar', () => {
  it('рендерится', () => {
    render(
      <MemoryRouter>
        <UserAvatar name="Test" />
      </MemoryRouter>
    );

    const component = screen.getByTestId('user-avatar');

    expect(component).toBeInTheDocument();
  });
});
