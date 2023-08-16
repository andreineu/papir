import { type FC } from 'react';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@src/ui-kit';

interface NotePreviewAlertDialogProps {
  onDeleteConfirm: () => void;
}

export const NotePreviewAlertDialog: FC<NotePreviewAlertDialogProps> = (
  props,
) => {
  const { onDeleteConfirm } = props;

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this note?
        </AlertDialogTitle>
        <AlertDialogDescription>
          It will be permanently deleted.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onDeleteConfirm}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
