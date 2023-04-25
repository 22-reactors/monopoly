import { render } from '@testing-library/react';
import { Leaderboard } from './leaderboard';

describe('Leaderboard', () => {
  it('рендерится', () => {
    jest.mock('../../controllers/leaderboard', () => ({
      getMonopolyResults: () => null,
    }));
    const { container } = render(<Leaderboard />);

    expect(container).toBeInTheDocument();
  });
});
