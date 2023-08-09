import { type FC } from 'react';

import { NotePreviewContextMenuContent } from './note-preview-context-menu';
import { NotePreviewDropdownMenuContent } from './note-preview-dropdown-menu';

interface NotePreviewMenuProps {
  onRenameClick?: () => void;
  onCopyClick?: () => void;
  onStarClick?: () => void;
  onDeleteClick?: () => void;

  isStarred?: boolean;
}

export const NotePreviewMenu: FC<NotePreviewMenuProps> = (props) => {
  return (
    <>
      <NotePreviewContextMenuContent {...props} />
      <NotePreviewDropdownMenuContent {...props} />
    </>
  );
};
