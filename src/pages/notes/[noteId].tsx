import { type PropsWithChildren, useEffect, useState } from 'react';

import { type Editor as EditorType } from '@tiptap/core';
import { FileX } from 'lucide-react';
import { useRouter } from 'next/router';

import { Editor } from '@src/components/editor';
import { api } from '@src/lib/api';
import { useNoteUpdateMutation } from '@src/lib/hooks/note.hooks';
import { useDebouncedCallback } from '@src/lib/use-debounced-callback';
import { useToast } from '@src/ui-kit';

const useNote = () => {
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

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto flex h-screen flex-col items-center gap-4 pt-16 md:max-w-[576px] lg:max-w-[768px] xl:max-w-[1024px]">
      {children}
    </div>
  );
};

export default function Page() {
  const [title, setTitle] = useState('');
  const { data, handleUpdateContent, handleUpdateTitle } = useNote();
  const { toast } = useToast();

  useEffect(() => {
    setTitle(data?.title ?? '');
  }, [data?.title]);

  const handleRename = () => {
    if (!title) {
      toast({ title: 'Title is required', variant: 'destructive' });
      setTitle(data?.title ?? '');
      return;
    }
    handleUpdateTitle(title);
  };

  if (!data) {
    return (
      <Layout>
        <div className="flex items-center justify-center gap-4 text-5xl text-neutral-200  ">
          <FileX size="64" /> <span>Not found</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
    </Layout>
  );
}
