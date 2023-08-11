import { beforeEach, describe, expect, it } from 'vitest';

import { type RouterInputs } from '@src/lib/api';
import { appRouter } from '@src/server/api/root';
import { createInnerTRPCContext } from '@src/server/api/trpc';
import { prisma } from '@src/server/db';

describe('trpc note router', () => {
  describe('unauthed', () => {
    let ctx: ReturnType<typeof createInnerTRPCContext>;
    let caller: ReturnType<(typeof appRouter)['createCaller']>;
    beforeEach(() => {
      ctx = createInnerTRPCContext({
        session: null,
      });

      caller = appRouter.createCaller(ctx);
    });

    it('cannot create note', async () => {
      const input: RouterInputs['note']['create'] = {
        title: 'hello world',
        content: '<p>Hello World</p>',
      };

      await expect(caller.note.create(input)).rejects.toThrowError(
        'UNAUTHORIZED',
      );
    });

    it('cannot get notes', async () => {
      await expect(caller.note.getAll()).rejects.toThrowError('UNAUTHORIZED');
    });

    it('cannot get note by Id', async () => {
      await expect(caller.note.getById({ id: '1' })).rejects.toThrowError(
        'UNAUTHORIZED',
      );
    });

    it('cannot delete', async () => {
      await expect(caller.note.delete({ id: '1' })).rejects.toThrowError(
        'UNAUTHORIZED',
      );
    });

    it('cannot update', async () => {
      await expect(
        caller.note.update({ id: '1', content: 'empty' }),
      ).rejects.toThrowError('UNAUTHORIZED');
    });
  });

  describe('authed', () => {
    let ctx: ReturnType<typeof createInnerTRPCContext>;
    let caller: ReturnType<(typeof appRouter)['createCaller']>;
    beforeEach(async () => {
      const user = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        create: { name: 'test', email: 'test@test.com', image: '' },
        update: {},
      });

      ctx = createInnerTRPCContext({
        session: {
          user,
          expires: '1',
        },
      });

      caller = appRouter.createCaller(ctx);
    });

    it('can create note', async () => {
      const input: RouterInputs['note']['create'] = {
        title: 'hello test',
        content: '<p>Hello World</p>',
      };

      const post = await caller.note.create(input);

      expect(post).toMatchObject(input);
    });

    it('can get created note by id', async () => {
      const input: RouterInputs['note']['create'] = {
        title: 'hello test',
        content: '<p>Hello World</p>',
      };

      const post = await caller.note.create(input);
      const byId = await caller.note.getById({ id: post.id });

      expect(byId).toMatchObject(input);
    });

    it('can get all created notes', async () => {
      const input: RouterInputs['note']['create'][] = [
        {
          title: 'hello test',
          content: '<p>Hello World</p>',
        },
        {
          title: 'hello test 2',
          content: '<p>Hello World 2</p>',
        },
      ];

      for (const note of input) {
        await caller.note.create(note);
      }

      const result = await caller.note.getAll();

      expect(result).toMatchObject(input);
    });

    it('can delete note', async () => {
      const input: RouterInputs['note']['create'][] = [
        {
          title: 'hello test',
          content: '<p>Hello World</p>',
        },
        {
          title: 'hello test 2',
          content: '<p>Hello World 2</p>',
        },
      ];

      for (const note of input) {
        await caller.note.create(note);
      }

      const ids = (await caller.note.getAll()).map((n) => n.id);

      const deleted = await caller.note.delete({ id: ids[0]! });

      const notes = await caller.note.getAll();

      expect(notes).not.toContain(deleted);
    });

    it('can update note', async () => {
      const input: RouterInputs['note']['create'] = {
        title: 'hello test',
        content: '<p>Hello World</p>',
      };

      const post = await caller.note.create(input);

      const updateInput: RouterInputs['note']['update'] = {
        id: post.id,
        title: 'hello test',
        content: '<p>Hello World</p>',
      };

      const updated = await caller.note.update(updateInput);

      expect(updated).toMatchObject(updateInput);
    });
  });
});
