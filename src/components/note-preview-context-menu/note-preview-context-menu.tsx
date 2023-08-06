import { type FC } from 'react';

import clsx from 'clsx';
import { Folders, PencilLine, Star, StarOff, Trash2 } from 'lucide-react';

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@src/ui-kit';

interface NotePreviewContextMenuContentProps {
  onRenameClick?: () => void;
  onCopyClick?: () => void;
  onStarClick?: () => void;
  onDeleteClick?: () => void;

  isStarred?: boolean;
}

export const NotePreviewContextMenuContent: FC<
  NotePreviewContextMenuContentProps
> = (props) => {
  const { onRenameClick, onCopyClick, onStarClick, onDeleteClick, isStarred } =
    props;

  return (
    <ContextMenuContent>
      <ContextMenuItem onClick={onRenameClick}>
        <PencilLine size="16" className="mr-2" />
        Rename
      </ContextMenuItem>
      <ContextMenuItem onClick={onCopyClick}>
        <Folders size="16" className="mr-2" />
        Make a copy
      </ContextMenuItem>
      <ContextMenuItem
        onClick={onStarClick}
        className={clsx(isStarred && 'dark:bg-neutral-800')}
      >
        {isStarred ? (
          <>
            <StarOff size="16" className="mr-2" />
            Unstar
          </>
        ) : (
          <>
            <Star size="16" className="mr-2" />
            Star
          </>
        )}
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem onClick={onDeleteClick}>
        <Trash2 size="16" className="mr-2" />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  );
};
