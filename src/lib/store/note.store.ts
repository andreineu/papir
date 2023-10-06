import { create } from 'zustand';

import { noteApi } from '../api';
import { type Note, type NotePayload } from '../api/notes';

type Filter = 'starred';

interface NotesState {
  notes: Note[];
  notesLoaded: boolean;
  filters: Record<Filter, boolean>;
}

interface NotesActions {
  addNote: (newNote: NotePayload) => Promise<Note>;
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNotes: () => Promise<Note[]>;

  toggleFilter: (filter: Filter) => void;
}

export const useNotesStore = create<NotesState & NotesActions>((set) => ({
  notes: [],
  notesLoaded: false,
  filters: { starred: false },

  getNotes: async () => {
    const notes = await noteApi.getNotes();
    set(() => ({ notes, notesLoaded: true }));
    return notes;
  },

  addNote: async (newNote) => {
    const note = await noteApi.createNote(newNote);
    set((state) => ({ notes: [...state.notes, note] }));
    return note;
  },

  updateNote: (id, updatedNote) => {
    noteApi.updateNoteById(id, updatedNote);
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note,
      ),
    }));
  },

  deleteNote: (id) => {
    noteApi.deleteNoteById(id);
    set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
  },

  toggleFilter: (filter) => {
    set((state) => ({
      filters: { ...state.filters, [filter]: !state.filters[filter] },
    }));
  },
}));
