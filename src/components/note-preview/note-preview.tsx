import React, { type FC, useEffect, useRef, useState } from 'react';

import { type Note } from '@prisma/client';

import { ContextMenu, ContextMenuTrigger } from '@src/ui-kit';

import { NotePreviewContextMenuContent } from '../note-preview-context-menu';

interface NotePreviewProps {
  note: Note;

  onRename: (name: string) => void;
  onCopyNote: () => void;
  onStar: () => void;
  onDeleteNote: () => void;
}

export const NotePreview: FC<NotePreviewProps> = (props) => {
  const { note, onCopyNote, onDeleteNote, onRename, onStar } = props;

  const [name, setName] = useState(note.title);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        ref.current?.focus();
      });
    }
  }, [isEditing]);

  const handleRename = () => {
    onRename(name);
    setIsEditing(false);
  };

  const handleCopy = () => {
    onCopyNote();
  };

  const handleStar = () => {
    onStar();
  };

  const handleDelete = () => {
    onDeleteNote();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {isEditing ? (
          <form onSubmit={handleRename}>
            <input
              ref={ref}
              onBlur={handleRename}
              className="w-full rounded bg-inherit p-1 pl-8 hover:bg-neutral-700 hover:no-underline focus:outline-neutral-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        ) : (
          <div className="rounded p-1 hover:bg-neutral-700 hover:no-underline">
            {name}
          </div>
        )}
      </ContextMenuTrigger>
      <NotePreviewContextMenuContent
        onRenameClick={() => {
          setIsEditing(true);
        }}
        onCopyClick={handleCopy}
        onStarClick={handleStar}
        onDeleteClick={handleDelete}
        isStarred={note.starred}
      />
    </ContextMenu>
  );
};
