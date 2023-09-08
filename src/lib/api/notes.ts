import localforage from 'localforage';

import { generateUId } from '../gen-id';
import { sanitize } from '../sanitize';

export interface Note {
  id: string;
  title: string;
  content: string;
  starred: boolean;
  createdAt: number;
  updatedAt: number;
}

export type NotePayload = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export class NoteApi {
  constructor() {
    localforage.config({
      name: 'papir-db',
      storeName: 'notes',
      version: 1,
    });
  }

  private sanitizeContent(content: string) {
    return sanitize(content);
  }

  public async getNotes(): Promise<Note[]> {
    try {
      const notes = await localforage.getItem<Note[]>('notes');
      if (notes && Array.isArray(notes)) {
        return notes;
      }
      return [];
    } catch (error) {
      throw new Error(`Error reading notes: ${error}`);
    }
  }

  public async createNote(payload: NotePayload) {
    try {
      const id = generateUId();

      const note = {
        ...payload,
        content: this.sanitizeContent(payload.content),
        id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const existingNotes = await this.getNotes();
      existingNotes.push(note);

      await localforage.setItem('notes', existingNotes);
      return note;
    } catch (error) {
      throw new Error(`Error creating note: ${error}`);
    }
  }

  public async updateNoteById(id: string, updatedNote: Partial<NotePayload>) {
    try {
      const existingNotes = await this.getNotes();

      if (!existingNotes || !Array.isArray(existingNotes)) {
        throw new Error('Notes not found.');
      }

      const noteIndex = existingNotes.findIndex((note) => note.id === id);
      if (noteIndex === -1) {
        throw new Error('Note not found.');
      }

      existingNotes[noteIndex] = {
        ...existingNotes[noteIndex]!,
        ...updatedNote,
        updatedAt: Date.now(),
      };

      if (updatedNote.content) {
        existingNotes[noteIndex]!.content = this.sanitizeContent(
          updatedNote.content,
        );
      }

      await localforage.setItem('notes', existingNotes);

      return existingNotes[noteIndex]!;
    } catch (error) {
      throw new Error(`Error updating note: ${error}`);
    }
  }

  public async deleteNoteById(id: string) {
    try {
      const existingNotes = await this.getNotes();

      if (!existingNotes || !Array.isArray(existingNotes)) {
        throw new Error('Notes not found.');
      }

      const updatedNotes = existingNotes.filter((note) => note.id !== id);
      await localforage.setItem('notes', updatedNotes);
    } catch (error) {
      throw new Error(`Error deleting note: ${error}`);
    }
  }
}
