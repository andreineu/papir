import { api } from '../api';

export const useNotesQuery = () => {
  return api.note.getAll.useQuery();
};

export const useNoteAddMutation = () => {
  const ctx = api.useContext();

  return api.note.create.useMutation({
    onSuccess: () => {
      ctx.note.getAll.invalidate();
    },
  });
};

export const useNoteUpdateMutation = () => {
  const ctx = api.useContext();

  return api.note.update.useMutation({
    onMutate: (variables) => {
      ctx.note.getAll.cancel();
      ctx.note.getById.cancel({ id: variables.id });

      const prevNote = ctx.note.getById.getData({ id: variables.id });
      const prevNotes = ctx.note.getAll.getData();

      if (prevNote) {
        ctx.note.getById.setData(
          { id: variables.id },
          { ...prevNote, ...variables },
        );
      }

      if (prevNotes) {
        const newNotes = prevNotes.map((note) =>
          note.id === variables.id ? { ...note, ...variables } : note,
        );
        ctx.note.getAll.setData(undefined, newNotes);
      }

      return { prevNote, prevNotes };
    },
    onError: (_err, variables, context) => {
      ctx.note.getAll.setData(undefined, context?.prevNotes);
      ctx.note.getById.setData({ id: variables.id }, context?.prevNote);
    },
    onSettled: (data) => {
      ctx.note.getById.invalidate({ id: data?.id });
      ctx.note.getAll.invalidate();
    },
  });
};

export const useNoteDeleteMutation = () => {
  const ctx = api.useContext();

  return api.note.delete.useMutation({
    onMutate(variables) {
      ctx.note.getAll.cancel();
      ctx.note.getById.cancel({ id: variables.id });

      const prevNote = ctx.note.getById.getData({ id: variables.id });
      const prevNotes = ctx.note.getAll.getData();

      if (prevNote) {
        ctx.note.getById.setData({ id: variables.id }, undefined);
      }

      if (prevNotes) {
        const newNotes = prevNotes.filter((note) => note.id !== variables.id);
        ctx.note.getAll.setData(undefined, newNotes);
      }

      return { prevNote, prevNotes };
    },
    onError(_err, variables, context) {
      ctx.note.getAll.setData(undefined, context?.prevNotes);
      ctx.note.getById.setData({ id: variables.id }, context?.prevNote);
    },
    onSettled: (data) => {
      ctx.note.getById.invalidate({ id: data?.id });
      ctx.note.getAll.invalidate();
    },
  });
};
