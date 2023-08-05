import { TRPCError } from '@trpc/server';
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
      const author = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!author) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
      }

      const content = sanitizeHtml(input.content);

      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content,
          author: { connect: { id: author.id } },
        },
      });
    }),
});
