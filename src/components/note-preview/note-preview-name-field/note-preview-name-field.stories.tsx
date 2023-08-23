import type { Meta, StoryObj } from '@storybook/react';

import { ContextMenu, ContextMenuTrigger, DropdownMenu } from '@src/ui-kit';

import { NotePreviewNameField } from './note-preview-name-field';

const meta: Meta<typeof NotePreviewNameField> = {
  component: NotePreviewNameField,
};

export default meta;
type Story = StoryObj<typeof NotePreviewNameField>;

const noop = () => null;

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
  render: () => {
    return (
      <ContextMenu>
        <DropdownMenu>
          <ContextMenuTrigger onClick={noop}>
            <NotePreviewNameField
              onRename={noop}
              onEditingChange={noop}
              editing={false}
              note={mockNote}
            />
          </ContextMenuTrigger>
        </DropdownMenu>
      </ContextMenu>
    );
  },
};

export const Editing: Story = {
  render: () => {
    return (
      <ContextMenu>
        <DropdownMenu>
          <ContextMenuTrigger onClick={noop}>
            <NotePreviewNameField
              onRename={noop}
              onEditingChange={noop}
              editing={true}
              note={mockNote}
            />
          </ContextMenuTrigger>
        </DropdownMenu>
      </ContextMenu>
    );
  },
};
