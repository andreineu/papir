import type { Meta, StoryObj } from '@storybook/react';

import { NotePreview } from './note-preview';

const meta: Meta<typeof NotePreview> = {
  component: NotePreview,
};

export default meta;
type Story = StoryObj<typeof NotePreview>;

const mockNote = {
  id: '1',
  authorId: '1',
  title: 'Test',
  content: '',
  starred: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Example: Story = {
  args: {
    note: mockNote,
    onCopyNote(payload) {
      console.log(payload);
    },
    onDeleteNote(id) {
      console.log(id);
    },
    onUpdateNote(payload) {
      console.log(payload);
    },
  },
};
