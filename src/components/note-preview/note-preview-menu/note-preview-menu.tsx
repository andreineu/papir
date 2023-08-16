import { type FC, useState } from 'react';

import { AlertDialog } from '@src/ui-kit';

import { NotePreviewAlertDialog } from './ui/note-preview-alert-dialog';
import { NotePreviewContextMenuContent } from './ui/note-preview-context-menu';
import { NotePreviewDropdownMenuContent } from './ui/note-preview-dropdown-menu';

interface NotePreviewMenuProps {
  onRenameClick: () => void;
  onCopyClick: () => void;
  onStarClick: () => void;
  onDeleteClick: () => void;

  isStarred?: boolean;
}

export const NotePreviewMenu: FC<NotePreviewMenuProps> = (props) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const open = () => {
    setIsAlertDialogOpen(true);
  };

  return (
    <>
      <NotePreviewContextMenuContent {...props} onDeleteClick={open} />
      <NotePreviewDropdownMenuContent {...props} onDeleteClick={open} />
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <NotePreviewAlertDialog onDeleteConfirm={props.onDeleteClick} />
      </AlertDialog>
    </>
  );
};
