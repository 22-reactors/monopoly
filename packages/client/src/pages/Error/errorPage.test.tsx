import { render } from '@testing-library/react';
import ErrorPage, { resolveCodeText } from './errorPage';
import { MemoryRouter } from 'react-router-dom';

describe('ErrorPage', () => {
  it('рендерится с 400 ошибкой', () => {
    const { message, discription } = resolveCodeText(400);
    const { getByTestId } = render(
      <MemoryRouter>
        <ErrorPage code={400} message={message} discription={discription} />
      </MemoryRouter>
    );

    expect(getByTestId('error-page')).toBeInTheDocument();
  });

  it('рендерится с 500 ошибкой', () => {
    const { message, discription } = resolveCodeText(500);
    const { getByTestId } = render(
      <MemoryRouter>
        <ErrorPage code={500} message={message} discription={discription} />
      </MemoryRouter>
    );

    expect(getByTestId('error-page')).toBeInTheDocument();
  });
});
