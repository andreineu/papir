import { FilePlus2, Star } from 'lucide-react';

import { cn } from '@src/lib/utils';
import { Button } from '@src/ui-kit';

import { NotePreview } from '../note-preview';
import { useNoteList } from './model';

export const NoteList = () => {
  const { toggleFilter, addNote, notes, filters } = useNoteList();

  return (
    <>
      <div className="flex justify-center gap-4 p-4">
        <Button
          size="icon"
          variant="ghost"
          className="dark:hover:bg-neutral-700"
          onClick={addNote}
        >
          <FilePlus2 />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'dark:hover:bg-neutral-700',
            filters.starred && 'dark:bg-neutral-700',
          )}
          onClick={() => toggleFilter('starred')}
        >
          <Star />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {notes?.map((note) => (
          <NotePreview key={note.id} note={note} />
        ))}
      </div>
    </>
  );
};
