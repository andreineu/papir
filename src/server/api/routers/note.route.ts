import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@src/server/api/trpc';

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;

    return ctx.prisma.note.findMany({ where: { authorId: user.id } });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const author = ctx.session.user;

      const content = sanitizeHtml(input.content);

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
      }),
    )
    .mutation(({ ctx, input }) => {
      const author = ctx.session.user;

      const content = input.content ? sanitizeHtml(input.content) : undefined;

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
