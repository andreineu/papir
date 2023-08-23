import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  NotePreviewNameField,
  type NotePreviewNameFieldProps,
} from './note-preview-name-field';

const renderSUT = (props: Partial<NotePreviewNameFieldProps> = {}) => {
  const note = {
    id: '1',
    authorId: '1',
    title: 'Test note',
    content: '',
    starred: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const onRenameMock = vi.fn();
  const onEditingChangeMock = vi.fn();

  const res = render(
    <NotePreviewNameField
      note={note}
      editing={false}
      onRename={onRenameMock}
      onEditingChange={onEditingChangeMock}
      {...props}
    />,
  );

  return { ...res, note, onRenameMock, onEditingChangeMock };
};

describe('NotePreviewNameField', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly when not editing', () => {
    const { getByDisplayValue, note } = renderSUT();

    expect(getByDisplayValue(note.title)).toBeInTheDocument();
  });

  it('renders correctly when editing', () => {
    const { getByDisplayValue, note } = renderSUT({ editing: false });

    expect(getByDisplayValue(note.title)).toBeInTheDocument();
  });

  it('calls onRename and onEditingChange when Enter key is pressed', () => {
    const { getByDisplayValue, note, onRenameMock, onEditingChangeMock } =
      renderSUT();

    const input = getByDisplayValue(note.title);
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onRenameMock).toHaveBeenCalledOnce();
    expect(onRenameMock).toHaveBeenCalledWith(note.title);
    expect(onEditingChangeMock).toHaveBeenCalledWith(false);
  });

  it('calls onRename with changed name and onEditingChange when Enter key is pressed', () => {
    const { getByDisplayValue, note, onRenameMock, onEditingChangeMock } =
      renderSUT();

    const input = getByDisplayValue(note.title);
    fireEvent.input(input, { target: { value: 'New name' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onRenameMock).toHaveBeenCalledOnce();
    expect(onRenameMock).toHaveBeenCalledWith('New name');
    expect(onEditingChangeMock).toHaveBeenCalledWith(false);
  });

  it('calls onRename with changed name and onEditingChange on blur', () => {
    const { getByDisplayValue, note, onRenameMock, onEditingChangeMock } =
      renderSUT();

    const input = getByDisplayValue(note.title);
    fireEvent.input(input, { target: { value: 'New name' } });
    fireEvent.blur(input);

    expect(onRenameMock).toHaveBeenCalledOnce();
    expect(onRenameMock).toHaveBeenCalledWith('New name');
    expect(onEditingChangeMock).toHaveBeenCalledWith(false);
  });

  it('calls onEditingChange when Escape key is pressed', () => {
    const { getByDisplayValue, note, onEditingChangeMock } = renderSUT();

    const input = getByDisplayValue(note.title);
    fireEvent.input(input, { key: 'Escape' });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(onEditingChangeMock).toHaveBeenCalledWith(false);
  });

  it('calls onEditingChange and does not call onRename when Escape key is pressed ', () => {
    const { getByDisplayValue, note, onRenameMock, onEditingChangeMock } =
      renderSUT();

    const input = getByDisplayValue(note.title);
    fireEvent.input(input, { target: { value: 'New name' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(onRenameMock).not.toHaveBeenCalled();
    expect(onEditingChangeMock).toHaveBeenCalledWith(false);
  });
});
