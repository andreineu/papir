import { type FC, useState } from 'react';

import { FilePlus2, PanelRight, Star } from 'lucide-react';

import { useNotesStore } from '@src/lib/store/note.store';
import { cn } from '@src/lib/utils';
import { Button } from '@src/ui-kit';

import { NoteList } from '../note-list';
import { INITIAL_SIDEBAR_IS_OPEN } from './constants';

interface SidebarProps {
  onOpenChange: () => void;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { onOpenChange } = props;

  const [isOpen, setIsOpen] = useState(INITIAL_SIDEBAR_IS_OPEN);

  const [filters, toggleFilter, addNote] = useNotesStore((store) => [
    store.filters,
    store.toggleFilter,
    store.addNote,
  ]);

  const handleAddNote = () => {
    addNote({
      title: 'Untitled',
      content: '',
      starred: false,
    });
  };

  const handleOpenChange = () => {
    setIsOpen(!isOpen);
    onOpenChange();
  };

  return (
    <>
      <div className="absolute left-4 top-4 rounded-lg border border-neutral-700">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 dark:hover:bg-neutral-700"
          onClick={handleOpenChange}
        >
          <PanelRight className="h-4 w-4" />
        </Button>
      </div>

      <div
        className={cn(
          'fixed left-0 top-0 z-10 flex w-[260px] justify-between gap-2 p-4 transition-transform duration-300 ease-in-out',
          isOpen ? 'visible flex translate-x-0' : '-translate-x-full',
        )}
      >
        <div
          className={cn(
            'flex flex-grow justify-between rounded-lg border border-neutral-700',
          )}
        >
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 dark:hover:bg-neutral-700"
            onClick={handleAddNote}
          >
            <FilePlus2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              'h-10 w-10 dark:hover:bg-neutral-700',
              filters.starred && 'dark:bg-neutral-700',
            )}
            onClick={() => toggleFilter('starred')}
          >
            <Star className="h-4 w-4" />
          </Button>
        </div>
        <div className="rounded-lg border border-neutral-700">
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 dark:hover:bg-neutral-700"
            onClick={handleOpenChange}
          >
            <PanelRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'fixed bottom-0 left-0 top-0 w-[260px] bg-neutral-200 pt-16 transition-transform duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200',
          isOpen ? 'visible flex translate-x-0' : '-translate-x-full',
        )}
      >
        <NoteList />
      </div>
    </>
  );
};
