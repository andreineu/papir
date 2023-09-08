import { create } from 'zustand';

import { noteApi } from '../api';
import { type Note, type NotePayload } from '../api/notes';

interface NotesState {
  notes: Note[];
  notesLoaded: boolean;
}

interface NotesActions {
  addNote: (newNote: NotePayload) => Promise<Note>;
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNotes: () => Promise<Note[]>;
}

export const useNotesStore = create<NotesState & NotesActions>((set) => ({
  notes: [],
  notesLoaded: false,

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
}));
