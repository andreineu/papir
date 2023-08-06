import { type Note } from '@prisma/client';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { client } from './api';

interface NotesState {
  notes: Note[];
}

interface NotesActions {
  addNote: (payload: Pick<Note, 'content' | 'title'>) => Promise<void>;
  updateNote: (
    payload: Partial<Pick<Note, 'content' | 'title' | 'starred'>> &
      Pick<Note, 'id'>,
  ) => Promise<void>;
  deleteNote: (payload: Pick<Note, 'id'>) => Promise<void>;
}

export const useNotesStore = create(
  immer<NotesState & NotesActions>((set) => ({
    notes: [],
    addNote: async (payload) => {
      const data = await client.note.create.mutate(payload);
      set((state) => {
        state.notes.push(data);
      });
    },
    updateNote: async (payload) => {
      const data = await client.note.update.mutate(payload);
      set((state) => {
        const idx = state.notes.findIndex((n) => n.id === payload.id);
        state.notes[idx] = data;
      });
    },
    deleteNote: async ({ id }) => {
      await client.note.delete.mutate({ id });
      set((state) => {
        state.notes = state.notes.filter((note) => note.id !== id);
      });
    },
  })),
);
