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

import { NotePreviewMenu } from '../note-preview-menu';
import { NotePreviewNameField } from '../note-preview-name-field/note-preview-name-field';

interface NotePreviewShellProps {
  note: Note;

  onClick: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onRename: (name: string) => void;
  onStar: () => void;
}

export const NotePreviewShell: FC<NotePreviewShellProps> = (props) => {
  const { note, onClick, onCopy, onDelete, onRename, onStar } = props;

  const [isEditing, setIsEditing] = useState(false);

  return (
    <ContextMenu>
      <DropdownMenu>
        <ContextMenuTrigger data-testid="note-preview-shell" onClick={onClick}>
          <NotePreviewNameField
            onRename={onRename}
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
          onCopyClick={onCopy}
          onStarClick={onStar}
          onDeleteClick={onDelete}
          isStarred={note.starred}
        />
      </DropdownMenu>
    </ContextMenu>
  );
};
