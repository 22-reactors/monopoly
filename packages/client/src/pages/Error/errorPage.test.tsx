import { render } from '@testing-library/react';
import ErrorPage, { resolveCodeText } from './errorPage';
import { MemoryRouter } from 'react-router-dom';

const ERROR_CODE_PAGE = 400;
const ERROR_CODE_SERVER = 500;
const COMPONENT_TEST_ID = 'error-page';

describe('ErrorPage', () => {
  it('рендерится с 400 ошибкой', () => {
    const { message, discription } = resolveCodeText(ERROR_CODE_PAGE);
    const { getByTestId } = render(
      <MemoryRouter>
        <ErrorPage
          code={ERROR_CODE_PAGE}
          message={message}
          discription={discription}
        />
      </MemoryRouter>
    );

    const component = getByTestId(COMPONENT_TEST_ID);

    const codeElement = component.querySelector('.code');
    const messageElement = component.querySelector('.message');

    expect(component).toBeInTheDocument();
    expect(codeElement).toHaveTextContent(ERROR_CODE_PAGE.toString());
    expect(messageElement).toHaveTextContent(message);
  });

  it('рендерится с 500 ошибкой', () => {
    const { message, discription } = resolveCodeText(ERROR_CODE_SERVER);
    const { getByTestId } = render(
      <MemoryRouter>
        <ErrorPage
          code={ERROR_CODE_SERVER}
          message={message}
          discription={discription}
        />
      </MemoryRouter>
    );

    const component = getByTestId(COMPONENT_TEST_ID);

    const codeElement = component.querySelector('.code');
    const messageElement = component.querySelector('.message');

    expect(component).toBeInTheDocument();
    expect(codeElement).toHaveTextContent(ERROR_CODE_SERVER.toString());
    expect(messageElement).toHaveTextContent(message);
  });
});
