import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react';

import { ContextMenu, ContextMenuTrigger, DropdownMenu } from '@src/ui-kit';

import { NotePreviewMenu } from './note-preview-menu';

const meta: Meta<typeof NotePreviewMenu> = {
  component: NotePreviewMenu,
};

export default meta;
type Story = StoryObj<typeof NotePreviewMenu>;

const noop = () => null;

export const Example: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <ContextMenu>
          <div className="flex gap-4">
            <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
            <DropdownMenuTrigger>Or Left-click me</DropdownMenuTrigger>
          </div>
          <NotePreviewMenu
            onCopyClick={noop}
            onDeleteClick={noop}
            onRenameClick={noop}
            onStarClick={noop}
          />
        </ContextMenu>
      </DropdownMenu>
    );
  },
};

export const Starred: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <ContextMenu>
          <div className="flex gap-4">
            <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
            <DropdownMenuTrigger>Or Left-click me</DropdownMenuTrigger>
          </div>
          <NotePreviewMenu
            isStarred
            onCopyClick={noop}
            onDeleteClick={noop}
            onRenameClick={noop}
            onStarClick={noop}
          />
        </ContextMenu>
      </DropdownMenu>
    );
  },
};
