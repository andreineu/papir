import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('ui-button', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Button />);

    const buttonElement = getByTestId('button');

    expect(buttonElement).toBeInTheDocument();
  });

  it('renders correct text', () => {
    const buttonText = 'Click me';

    const { getByTestId } = render(<Button>{buttonText}</Button>);

    const buttonElement = getByTestId('button');

    expect(buttonElement).toHaveTextContent(buttonText);
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = vi.fn();

    const { getByTestId } = render(<Button onClick={onClickMock} />);

    const buttonElement = getByTestId('button');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();

    const { getByTestId } = render(<Button ref={ref} />);

    const buttonElement = getByTestId('button');

    expect(ref.current).toBe(buttonElement);
  });

  describe('snaphots', () => {
    it('variant default', () => {
      const { asFragment } = render(<Button />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('variant desctructive', () => {
      const { asFragment } = render(<Button variant="destructive" />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('variant outline', () => {
      const { asFragment } = render(<Button variant="outline" />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('variant secondary', () => {
      const { asFragment } = render(<Button variant="secondary" />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('variant ghost', () => {
      const { asFragment } = render(<Button variant="ghost" />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('variant link', () => {
      const { asFragment } = render(<Button variant="link" />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
