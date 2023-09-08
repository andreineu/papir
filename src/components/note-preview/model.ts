import { useRouter } from 'next/router';

import { type Note } from '@src/lib/api/notes';
import { useNotesStore } from '@src/lib/store/note.store';

export const useNotePreview = (note: Note) => {
  const router = useRouter();

  const [deleteNote, addNote, updateNote] = useNotesStore((state) => [
    state.deleteNote,
    state.addNote,
    state.updateNote,
  ]);

  const isActive = router.asPath === '/notes/' + note.id;

  const handleClick = () => {
    router.push('/notes/' + note.id);
  };

  const handleCopy = () => {
    addNote({
      title: note.title + ' copy',
      content: note.content,
      starred: note.starred,
    });
  };

  const handleDelete = () => {
    deleteNote(note.id);

    if (router.asPath === '/notes' + note.id) {
      router.push('/');
    }
  };

  const handleStar = () => {
    updateNote(note.id, {
      starred: !note.starred,
    });
  };

  const handleRename = (title: string) => {
    updateNote(note.id, {
      title,
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
