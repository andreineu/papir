import { noteRouter } from '@src/server/api/routers/note';
import { createTRPCRouter } from '@src/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
