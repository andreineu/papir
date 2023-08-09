import type { Meta, StoryObj } from '@storybook/react';

import { ContextMenu, ContextMenuTrigger } from '@src/ui-kit';

import { NotePreviewContextMenuContent } from './note-preview-context-menu';

const meta: Meta<typeof NotePreviewContextMenuContent> = {
  component: NotePreviewContextMenuContent,
};

export default meta;
type Story = StoryObj<typeof NotePreviewContextMenuContent>;

export const Example: Story = {
  render: () => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <NotePreviewContextMenuContent />
      </ContextMenu>
    );
  },
};

export const Starred: Story = {
  render: () => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <NotePreviewContextMenuContent isStarred />
      </ContextMenu>
    );
  },
};
