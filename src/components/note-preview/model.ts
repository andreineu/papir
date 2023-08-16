import { type Note } from '@prisma/client';
import { useRouter } from 'next/router';

import { api } from '@src/lib/api';
import {
  useNoteAddMutation,
  useNoteDeleteMutation,
  useNoteUpdateMutation,
} from '@src/lib/hooks/note.hooks';

export const useNotePreview = (note: Note) => {
  const router = useRouter();

  const ctx = api.useContext();
  const addMutation = useNoteAddMutation();
  const deleteMutation = useNoteDeleteMutation();
  const updateMutation = useNoteUpdateMutation();

  const isActive = router.asPath === '/notes/' + note.id;

  const handleClick = () => {
    router.push('/notes/' + note.id);
    ctx.note.getById.setData({ id: note.id }, note);
  };

  const handleCopy = () => {
    addMutation.mutate({
      title: note.title + ' copy',
      content: note.content,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      id: note.id,
    });

    if (router.asPath === '/notes' + note.id) {
      router.push('/');
    }
  };

  const handleStar = () => {
    updateMutation.mutate({
      id: note.id,
      starred: !note.starred,
    });
  };

  const handleRename = (name: string) => {
    updateMutation.mutate({
      id: note.id,
      title: name,
    });
  };

  return {
    handleClick,
    handleRename,
    handleCopy,
    handleDelete,
    handleStar,
    isActive,
  };
};
