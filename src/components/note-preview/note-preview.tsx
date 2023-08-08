import React, { type FC, useEffect, useRef, useState } from 'react';

import { type Note } from '@prisma/client';
import { useRouter } from 'next/router';

import { api } from '@src/lib/api';
import {
  useNoteAddMutation,
  useNoteDeleteMutation,
  useNoteUpdateMutation,
} from '@src/lib/hooks/note.hooks';
import { cn } from '@src/lib/utils';
import { ContextMenu, ContextMenuTrigger } from '@src/ui-kit';

import { NotePreviewContextMenuContent } from '../note-preview-context-menu';

interface NotePreviewProps {
  note: Note;
}

export const NotePreview: FC<NotePreviewProps> = (props) => {
  const { note } = props;

  const router = useRouter();

  const [name, setName] = useState(note.title);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const ctx = api.useContext();
  const addMutation = useNoteAddMutation();
  const deleteMutation = useNoteDeleteMutation();
  const updateMutation = useNoteUpdateMutation();

  useEffect(() => {
    setName(note.title);
  }, [note.title]);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        ref.current?.focus();
      });
    }
  }, [isEditing]);

  const isActive = router.asPath === '/notes/' + note.id;

  const handleClick = () => {
    router.push('/notes/' + note.id);
    ctx.note.getById.setData({ id: note.id }, note);
  };

  const handleRename = () => {
    setIsEditing(false);

    updateMutation.mutate({
      id: note.id,
      title: name,
    });
  };

  const handleCopy = () => {
    addMutation.mutate({
      title: note.title + ' copy',
      content: note.content,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      id: note.id,
    });
    if (router.asPath === '/notes' + note.id) {
      router.push('/');
    }
  };

  const handleStar = () => {
    updateMutation.mutate({
      id: note.id,
      starred: !note.starred,
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild onClick={handleClick}>
        {isEditing ? (
          <form onSubmit={handleRename}>
            <input
              ref={ref}
              onBlur={handleRename}
              className={cn(
                'w-full rounded bg-inherit px-3 py-1 hover:bg-neutral-700 hover:no-underline focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600',
                isActive && 'bg-neutral-600 hover:bg-neutral-600',
              )}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        ) : (
          <div
            className={cn(
              'h-8 rounded px-3 py-1 hover:bg-neutral-700 hover:no-underline',
              isActive && 'bg-neutral-600  hover:bg-neutral-600',
            )}
          >
            <span className="block truncate">{name}</span>
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
