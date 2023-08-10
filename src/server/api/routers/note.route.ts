import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { sanitize } from '@src/lib/sanitize';
import { createTRPCRouter, protectedProcedure } from '@src/server/api/trpc';

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;

    return ctx.prisma.note.findMany({
      where: { authorId: user.id },
      orderBy: { title: 'asc' },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;

      const note = await ctx.prisma.note.findUnique({
        where: { id: input.id, authorId: user.id },
      });

      if (!note) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Note not found' });
      }

      return note;
    }),

  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      const author = ctx.session.user;

      const content = sanitize(input.content);

      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content,
          author: { connect: { id: author.id } },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string().optional(),
        title: z.string().optional(),
        starred: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const author = ctx.session.user;

      const content = input.content ? sanitize(input.content) : undefined;

      return ctx.prisma.note.update({
        where: { id: input.id, authorId: author.id },
        data: { ...input, content },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: { id: input.id },
      });
    }),
});
