import { render, screen } from '@testing-library/react';
import { Info } from './info';
import { FieldMap } from '../../pages/profile/profile';
import { MemoryRouter } from 'react-router-dom';

describe('Info', () => {
  const fields = Object.values(FieldMap);

  it('рендерится', () => {
    render(
      <MemoryRouter>
        <Info validation={false} fields={fields} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('form');

    expect(component).toBeInTheDocument();
  });
});
