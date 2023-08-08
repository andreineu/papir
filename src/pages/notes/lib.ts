import { type Editor as EditorType } from '@tiptap/core';
import { useRouter } from 'next/router';

import { api } from '@src/lib/api';
import { useNoteUpdateMutation } from '@src/lib/hooks/note.hooks';
import { useDebouncedCallback } from '@src/lib/use-debounced-callback';

export const useNote = () => {
  const router = useRouter();
  const id = router.query.noteId as string;

  const { data } = api.note.getById.useQuery({
    id,
  });

  const { mutate } = useNoteUpdateMutation();

  const updateContent = ({ editor }: { editor: EditorType }) => {
    mutate({
      id,
      content: editor.getHTML(),
    });
  };

  const updateTitle = (title: string) => {
    mutate({
      id,
      title,
    });
  };

  const handleUpdateContent = useDebouncedCallback(updateContent, 500);
  const handleUpdateTitle = useDebouncedCallback(updateTitle, 500);

  return {
    data,
    handleUpdateContent,
    handleUpdateTitle,
  };
};
