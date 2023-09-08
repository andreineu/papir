import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { NotePreviewShell } from './note-preview-shell';

const renderSUT = (menuOpened = false) => {
  const note = {
    id: '1',
    authorId: '1',
    title: 'Test note',
    content: '',
    starred: false,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  const onClickMock = vi.fn();
  const onCopyMock = vi.fn();
  const onDeleteMock = vi.fn();
  const onRenameMock = vi.fn();
  const onStarMock = vi.fn();

  const res = render(
    <NotePreviewShell
      note={note}
      onClick={onClickMock}
      onCopy={onCopyMock}
      onDelete={onDeleteMock}
      onRename={onRenameMock}
      onStar={onStarMock}
    />,
  );

  if (menuOpened) {
    fireEvent.contextMenu(res.getByRole('button'));
  }

  return {
    ...res,
    note,
    onClickMock,
    onCopyMock,
    onDeleteMock,
    onRenameMock,
    onStarMock,
  };
};

describe('NotePreviewShell', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly', () => {
    const { getByDisplayValue, note } = renderSUT();

    expect(getByDisplayValue(note.title)).toBeInTheDocument();
  });

  it('opens dropdown menu when clicked on button', () => {
    const { getByRole } = renderSUT();

    fireEvent.click(getByRole('button'));

    waitFor(() => expect(getByRole('menu')).toBeInTheDocument());
  });

  it('opens context menu when right clicked', () => {
    const { getByDisplayValue, getByRole, note } = renderSUT();

    fireEvent.contextMenu(getByDisplayValue(note.title));

    waitFor(() => expect(getByRole('menu')).toBeInTheDocument());
  });

  it('calls onClick when clicked on element', () => {
    const { onClickMock, getByTestId } = renderSUT();

    fireEvent.click(getByTestId('note-preview-shell'));

    expect(onClickMock).toBeCalledTimes(1);
  });

  it('calls onCopy when clicked on copy list-item', () => {
    const { onCopyMock, getByRole } = renderSUT(true);

    fireEvent.click(getByRole('menuitem', { name: 'Make a copy' }));

    expect(onCopyMock).toBeCalledTimes(1);
  });

  it('calls onStar when clicked on star list-item', () => {
    const { onStarMock, getByRole } = renderSUT(true);

    fireEvent.click(getByRole('menuitem', { name: 'Star' }));

    expect(onStarMock).toBeCalledTimes(1);
  });

  it('does not call onDelete when clicked on delete list-item', () => {
    const { onDeleteMock, getByRole } = renderSUT(true);

    fireEvent.click(getByRole('menuitem', { name: 'Delete' }));

    expect(onDeleteMock).not.toBeCalled();
  });

  it('opens alert-dialog when clicked on delete list-item', () => {
    const { getByRole } = renderSUT(true);

    fireEvent.click(getByRole('menuitem', { name: 'Delete' }));

    expect(getByRole('alertdialog')).toBeInTheDocument();
  });

  it('makes element editable when clicked on rename list-item', () => {
    const { getByRole } = renderSUT(true);

    fireEvent.click(getByRole('menuitem', { name: 'Rename' }));

    expect(getByRole('textbox')).not.toBeDisabled();
  });
});
