import { render, screen } from '@testing-library/react';
import Themetoggler from './index';

describe('ThemeToggler', () => {
  it('рендерится', () => {
    const Component = () => <div/>;

    render(<Themetoggler children={[<Component key={0}/>]} />);

    const component = screen.getByTestId('theme-toggler');

    expect(component).toBeInTheDocument();
  });
});
