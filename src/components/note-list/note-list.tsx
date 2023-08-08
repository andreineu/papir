import { useState } from 'react';

import { FilePlus2, Star } from 'lucide-react';

import { api } from '@src/lib/api';
import { useNoteAddMutation } from '@src/lib/hooks/note.hooks';
import { cn } from '@src/lib/utils';
import { Button } from '@src/ui-kit';

import { NotePreview } from '../note-preview';

export const NoteList = () => {
  const query = api.note.getAll.useQuery();
  const [isStarredOnly, setIsStarredOnly] = useState(false);

  const addMutation = useNoteAddMutation();

  const handleAddNote = () => {
    addMutation.mutate({
      title: 'Untitled',
      content: '',
    });
  };

  return (
    <>
      <div className="flex justify-center gap-4 p-4">
        <Button
          size="icon"
          variant="ghost"
          className="dark:hover:bg-neutral-700"
          onClick={handleAddNote}
        >
          <FilePlus2 />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'dark:hover:bg-neutral-700',
            isStarredOnly && 'dark:bg-neutral-700',
          )}
          onClick={() => setIsStarredOnly(!isStarredOnly)}
        >
          <Star />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {query.data
          ?.sort((a, b) => a.title.localeCompare(b.title))
          ?.filter((note) => {
            if (isStarredOnly) {
              return note.starred;
            }
            return true;
          })
          .map((note) => (
            <NotePreview key={note.id} note={note} />
          ))}
      </div>
    </>
  );
};
