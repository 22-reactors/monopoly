import { render, screen } from '@testing-library/react';
import { GameModal } from './gameModal';

describe('GameModal', () => {
  it('рендерится', () => {
    render(
      <GameModal title="Test" show={true}>
        <></>
      </GameModal>
    );

    const component = screen.getByTestId('dialog');

    expect(component).toBeInTheDocument();
  });
});
