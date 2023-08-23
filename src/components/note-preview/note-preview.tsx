import React, { type FC, useState } from 'react';

import { type Note } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import {
  Button,
  ContextMenu,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@src/ui-kit';

import { useNotePreview } from './model';
import { NotePreviewMenu } from './note-preview-menu';
import { NotePreviewNameField } from './note-preview-name-field/note-preview-name-field';

interface NotePreviewProps {
  note: Note;
}

export const NotePreview: FC<NotePreviewProps> = (props) => {
  const { note } = props;

  const [isEditing, setIsEditing] = useState(false);

  const { handleClick, handleCopy, handleDelete, handleRename, handleStar } =
    useNotePreview(note);

  return (
    <ContextMenu>
      <DropdownMenu>
        <ContextMenuTrigger onClick={handleClick}>
          <NotePreviewNameField
            onRename={handleRename}
            onEditingChange={setIsEditing}
            editing={isEditing}
            note={note}
          >
            <NotePreviewNameField.Actions>
              <DropdownMenuTrigger asChild>
                <Button className="h-6 w-6" variant="ghost" size="icon">
                  <DotsHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
            </NotePreviewNameField.Actions>
          </NotePreviewNameField>
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
