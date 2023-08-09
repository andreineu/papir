import React, { type FC, useEffect, useRef, useState } from 'react';

import { type Note } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';

import { api } from '@src/lib/api';
import {
  useNoteAddMutation,
  useNoteDeleteMutation,
  useNoteUpdateMutation,
} from '@src/lib/hooks/note.hooks';
import { cn } from '@src/lib/utils';
import {
  Button,
  ContextMenu,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@src/ui-kit';

import { NotePreviewMenu } from '../note-preview-menu';

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
      <DropdownMenu>
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
                'group relative h-8 justify-between rounded px-3 py-1 hover:bg-neutral-700 hover:no-underline',
                isActive && 'bg-neutral-600 hover:bg-neutral-600',
              )}
            >
              <span className="block truncate">{name}</span>{' '}
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="invisible absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 transform group-hover:visible"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DotsHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
            </div>
          )}
        </ContextMenuTrigger>
        <NotePreviewMenu
          onRenameClick={() => {
            setIsEditing(true);
          }}
          onCopyClick={handleCopy}
          onStarClick={handleStar}
          onDeleteClick={handleDelete}
          isStarred={note.starred}
        />
      </DropdownMenu>
    </ContextMenu>
  );
};
