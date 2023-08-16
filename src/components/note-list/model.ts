import { useState } from 'react';

import { api } from '@src/lib/api';
import { useNoteAddMutation } from '@src/lib/hooks/note.hooks';

type Filter = 'starred';

export const useNoteList = () => {
  const query = api.note.getAll.useQuery();
  const [filters, setFilters] = useState<Record<Filter, boolean>>({
    starred: false,
  });

  const addMutation = useNoteAddMutation();

  const addNote = () => {
    addMutation.mutate({
      title: 'Untitled',
      content: '',
    });
  };

  const activateFilter = (filter: Filter) => {
    setFilters({ ...filters, [filter]: true });
  };

  const deactivateFilter = (filter: Filter) => {
    setFilters({ ...filters, [filter]: false });
  };

  const notes = query.data
    ?.filter((note) => (filters.starred ? note.starred : true))
    ?.sort((a, b) => a.title.localeCompare(b.title));

  return { notes, activateFilter, deactivateFilter, filters, addNote };
};
