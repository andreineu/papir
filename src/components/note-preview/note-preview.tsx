import React, { type FC } from 'react';

import { type Note } from '@prisma/client';

import { useNotePreview } from './model';
import { NotePreviewShell } from './note-preview-shell/note-preview-shell';

interface NotePreviewProps {
  note: Note;
}

export const NotePreview: FC<NotePreviewProps> = (props) => {
  const { note } = props;

  const { handleClick, handleCopy, handleDelete, handleRename, handleStar } =
    useNotePreview(note);

  return (
    <NotePreviewShell
      note={note}
      onClick={handleClick}
      onCopy={handleCopy}
      onDelete={handleDelete}
      onRename={handleRename}
      onStar={handleStar}
    />
  );
};
