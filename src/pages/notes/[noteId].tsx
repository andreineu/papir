import { useEffect, useState } from 'react';

import { type Editor as EditorType } from '@tiptap/core';
import { FileX } from 'lucide-react';
import { useRouter } from 'next/router';

import { Editor } from '@src/components/editor';
import { api } from '@src/lib/api';
import { useNoteUpdateMutation } from '@src/lib/hooks/note.hooks';
import { useDebouncedCallback } from '@src/lib/use-debounced-callback';
import { useToast } from '@src/ui-kit';

export default function Page() {
  const [title, setTitle] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const id = router.query.noteId as string;

  const { data } = api.note.getById.useQuery({
    id,
  });

  const { mutate } = useNoteUpdateMutation();

  const handleUpdateContent = useDebouncedCallback(
    ({ editor }: { editor: EditorType }) => {
      mutate({
        id,
        content: editor.getHTML(),
      });
    },
    1000,
  );

  useEffect(() => {
    setTitle(data?.title ?? '');
  }, [data?.title]);

  const handleRename = () => {
    if (!title) {
      toast({ title: 'Title is required', variant: 'destructive' });
      return setTitle(data?.title ?? '');
    }
    if (title !== data?.title) {
      mutate({
        id,
        title,
      });
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center gap-4 text-5xl text-neutral-200  ">
        <FileX size="64" /> <span>Not found</span>
      </div>
    );
  }

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleRename();
      }}
    >
      <input
        className="mb-4 w-full bg-transparent text-5xl focus:outline-none"
        placeholder="Title..."
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onBlur={handleRename}
      />
      <Editor onUpdate={handleUpdateContent} content={data.content} />
    </form>
  );
}
