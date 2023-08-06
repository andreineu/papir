import { useEffect, useState } from 'react';

import { FilePlus2 } from 'lucide-react';

import { api } from '@src/lib/api';
import { useNotesStore } from '@src/lib/notes.store';
import { Button } from '@src/ui-kit';

import { NotePreview } from '../note-preview';

const useHydratedNoteList = () => {
  const { data: notes } = api.note.getAll.useQuery();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!hydrated && notes) {
      useNotesStore.setState({ notes });
      setHydrated(true);
    }
  }, [hydrated, notes]);
  const store = useNotesStore();
  return store;
};

export const NoteList = () => {
  const store = useHydratedNoteList();

  const handleAddNote = () => {
    store.addNote({
      title: 'Untitled',
      content: '',
    });
  };

  return (
    <>
      <div className="flex justify-center p-4">
        <Button
          size="icon"
          variant="ghost"
          className="dark:hover:bg-neutral-700"
          onClick={handleAddNote}
        >
          <FilePlus2 />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {store.notes?.map((note) => (
          <NotePreview
            key={note.id}
            note={note}
            onCopyNote={() => {
              store.addNote({
                title: note.title + ' copy',
                content: note.content,
              });
            }}
            onDeleteNote={() => {
              store.deleteNote({ id: note.id });
            }}
            onRename={(title) => {
              store.updateNote({ id: note.id, title });
            }}
            onStar={() => {
              store.updateNote({ id: note.id, starred: !note.starred });
            }}
          />
        ))}
      </div>
    </>
  );
};