import { type FC } from 'react';

import clsx from 'clsx';
import { Folders, PencilLine, Star, StarOff, Trash2 } from 'lucide-react';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@src/ui-kit';

interface NotePreviewDropdownMenuContentProps {
  onRenameClick?: () => void;
  onCopyClick?: () => void;
  onStarClick?: () => void;
  onDeleteClick?: () => void;

  isStarred?: boolean;
}

export const NotePreviewDropdownMenuContent: FC<
  NotePreviewDropdownMenuContentProps
> = (props) => {
  const { onRenameClick, onCopyClick, onStarClick, onDeleteClick, isStarred } =
    props;

  return (
    <DropdownMenuContent>
      <DropdownMenuItem onClick={onRenameClick}>
        <PencilLine size="16" className="mr-2" />
        Rename
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onCopyClick}>
        <Folders size="16" className="mr-2" />
        Make a copy
      </DropdownMenuItem>
      <DropdownMenuItem
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
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={onDeleteClick}>
        <Trash2 size="16" className="mr-2" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
