import Avatar from './avatar';
import { render, screen } from '@testing-library/react';
import { resourceURL } from '../../utils/const';

jest.mock('../../assets/avatar-empty.png');

describe('Avatar', () => {
  it('рендерится с пустым аватаром', () => {
    const { container } = render(<Avatar />);

    expect(container).toBeInTheDocument();
  });

  it('рендерится с переданной ссылкой на аватар', () => {
    const avatarSrc = 'avatar';
    render(<Avatar src={avatarSrc} />);

    const element = screen.getByRole('img');
    expect(element).toHaveAttribute('src', `${resourceURL}${avatarSrc}`);
  });
});
