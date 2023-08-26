import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';

const renderSUT = async () => {
  const user = userEvent.setup();
  const res = render(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>,
  );

  await user.click(res.getByText('Open'));

  return { user, ...res };
};

describe('DropdownMenu', () => {
  describe('when using pointer', () => {
    it('should open submenu when moving pointer over trigger', async () => {
      const { getByText, findByText, user } = await renderSUT();

      await user.hover(getByText('Invite users'));

      expect(await findByText('Email')).toBeInTheDocument();
    });

    it('should not focus first item after when moving pointer over submenu trigger', async () => {
      const { getByText, findByText, user } = await renderSUT();

      await user.hover(getByText('Invite users'));

      expect(await findByText('Email')).not.toHaveFocus();
    });

    it('should close submenu when moving pointer to any item in parent menu', async () => {
      const { getByText, queryByText, user } = await renderSUT();

      await user.hover(getByText('Invite users'));
      await user.hover(getByText('Profile'));

      expect(queryByText('Email')).not.toBeInTheDocument();
    });

    it('should close all menus when clicking any item on root menu', async () => {
      const { getByText, queryByText, user } = await renderSUT();

      await user.click(getByText('Profile'));

      expect(queryByText('My Account')).not.toBeInTheDocument();
    });
  });

  describe('when using keyboard', () => {
    it('should not open submenu when moving focus to trigger', async () => {
      const { getByText, queryByText } = await renderSUT();

      getByText('Invite users').focus();

      expect(queryByText('Email')).not.toBeInTheDocument();
    });

    it.each(['[ArrowRight]', '[Enter]', '[Space]'])(
      'should open submenu when pressing %s key',
      async (key) => {
        const { getByText, user } = await renderSUT();

        getByText('Invite users').focus();
        await user.keyboard(key);

        expect(getByText('Email')).toBeInTheDocument();
      },
    );

    it('should focus first item when opening submenu', async () => {
      const { getByText, user } = await renderSUT();

      getByText('Invite users').focus();
      await user.keyboard('[ArrowRight]');

      expect(getByText('Email')).toHaveFocus();
    });

    it('should close submenu when pressing left arrow key', async () => {
      const { getByText, queryByText, user } = await renderSUT();

      getByText('Invite users').focus();
      await user.keyboard('[ArrowRight]');
      await user.keyboard('[ArrowLeft]');

      expect(queryByText('Email')).not.toBeInTheDocument();
    });

    it('should close only the focused submenu when pressing left arrow key', async () => {
      const { getByText, queryByText, user } = await renderSUT();

      getByText('Invite users').focus();
      await user.keyboard('[ArrowRight]');
      await user.keyboard('[ArrowLeft]');

      expect(queryByText('My Account')).toBeInTheDocument();
    });

    it('should focus first item when pressing right arrow key after opening submenu with mouse', async () => {
      const { getByText, user } = await renderSUT();

      await user.hover(getByText('Invite users'));
      await user.keyboard('[ArrowRight]');

      expect(getByText('Email')).toHaveFocus();
    });

    it.each(['[Escape]', '[Enter]', '[Space]'])(
      'should close all menus when pressing %s on any item on root menu',
      async (key) => {
        const { getByText, queryByText, user } = await renderSUT();

        getByText('Profile').focus();
        await user.keyboard(key);

        expect(queryByText('My Account')).not.toBeInTheDocument();
      },
    );

    it.each(['[Escape]', '[Enter]', '[Space]'])(
      'should close all menus when pressing %s on any item on submenu',
      async (key) => {
        const { getByText, queryByText, user } = await renderSUT();

        await user.hover(getByText('Invite users'));
        await user.keyboard('[ArrowRight]');
        await user.keyboard(key);

        expect(queryByText('My Account')).not.toBeInTheDocument();
      },
    );
  });
});
