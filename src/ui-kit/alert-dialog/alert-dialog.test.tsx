import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

describe('AlertDialog', () => {
  it('is not in the DOM by default', () => {
    const { queryByRole } = renderAlertDialog({});

    const content = queryByRole('alertdialog');

    expect(content).not.toBeInTheDocument();
  });

  it('is visible when trigger element is clicked', () => {
    const { getByRole } = renderAlertDialog();

    fireEvent.click(getByRole('button', { name: /Show Dialog/i }));

    const alertDialog = getByRole('alertdialog');

    expect(alertDialog).toBeVisible();
  });

  it('closes when cancel component is clicked', () => {
    const { getByRole, queryByRole } = renderAlertDialog({
      defaultOpen: true,
    });

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    const alertDialog = queryByRole('alertdialog');

    expect(alertDialog).not.toBeInTheDocument();
  });

  it('is visible if defaultOpen prop is passed', () => {
    const { getByRole } = renderAlertDialog({ defaultOpen: true });

    const content = getByRole('alertdialog');

    expect(content).toBeVisible();
  });
});

const renderAlertDialog = (args: { defaultOpen?: boolean } = {}) => {
  const { defaultOpen } = args;

  return render(
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            necessitatibus labore obcaecati natus aut non. Perferendis, voluptas
            optio. Explicabo voluptates quis omnis pariatur consectetur fuga
            doloribus illo, eligendi tempore voluptatum!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  );
};
