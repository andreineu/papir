import { useEffect, useState } from 'react';

import { type Note } from '@src/lib/api/notes';
import { useNotesStore } from '@src/lib/store/note.store';

type Filter = 'starred';

export const useNoteList = () => {
  const [notes, createNote, getNotes] = useNotesStore((store) => [
    store.notes,
    store.addNote,
    store.getNotes,
  ]);

  const [filteredNotes, setFilteredNotes] = useState<Note[]>();

  const [filters, setFilters] = useState<Record<Filter, boolean>>({
    starred: false,
  });

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    setFilteredNotes(
      notes
        ?.filter((note) => (filters.starred ? note.starred : true))
        ?.sort((a, b) => a.title.localeCompare(b.title)),
    );
  }, [notes, filters]);

  const toggleFilter = (filter: Filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  const addNote = () => {
    const note = {
      title: 'Untitled',
      content: '',
      starred: false,
    };

    createNote(note);
  };

  return {
    notes: filteredNotes,
    filters,
    addNote,
    toggleFilter,
  };
};
