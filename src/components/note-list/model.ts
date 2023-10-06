import { useEffect, useMemo } from 'react';

import { useNotesStore } from '@src/lib/store/note.store';

export const useNoteList = () => {
  const [notes, filters, getNotes] = useNotesStore((store) => [
    store.notes,
    store.filters,
    store.getNotes,
  ]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => (filters.starred ? note.starred : true));
  }, [notes, filters]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return {
    notes: filteredNotes,
  };
};
