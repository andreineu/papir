import { useEffect, useState } from 'react';

import { type Editor as EditorType } from '@tiptap/core';
import { useRouter } from 'next/router';

import { Editor } from '@src/components/editor';
import { type Note } from '@src/lib/api/notes';
import { useNotesStore } from '@src/lib/store/note.store';
import { useDebouncedCallback } from '@src/lib/use-debounced-callback';
import { useToast } from '@src/ui-kit';

export default function Page() {
  const [title, setTitle] = useState('');
  const { toast } = useToast();
  const [note, setNote] = useState<Note>();
  const [isEditorReady, setIsEditorReady] = useState(false);

  const router = useRouter();
  const id = router.query.noteId as string;

  const [notes, notesLoaded, updateNote] = useNotesStore((store) => [
    store.notes,
    store.notesLoaded,
    store.updateNote,
  ]);

  useEffect(() => {
    if (!id || !notesLoaded) {
      return;
    }

    setIsEditorReady(false);

    const _note = notes.find((note) => note.id === id);

    if (!_note) {
      router.push('/notes/404');
      return;
    }

    setNote(_note);
    setTitle(_note.title);
    setIsEditorReady(true);
  }, [id, notesLoaded, notes, router]);

  const handleUpdateContent = useDebouncedCallback(
    ({ editor }: { editor: EditorType }) => {
      updateNote(id, {
        content: editor.getHTML(),
      });
    },
    300,
  );

  const handleRename = () => {
    if (!title) {
      toast({ title: 'Title is required', variant: 'destructive' });
      return setTitle(note?.title ?? '');
    }

    updateNote(id, {
      title,
    });
  };

  if (!note) {
    return null;
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
      {isEditorReady && (
        <Editor onUpdate={handleUpdateContent} content={note.content} />
      )}
    </form>
  );
}
