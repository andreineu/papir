import { useRouter } from 'next/router';

import { useNotesStore } from '@src/lib/store/note.store';
import { Button } from '@src/ui-kit';

export default function Home() {
  const router = useRouter();

  const [addNote] = useNotesStore((store) => [store.addNote]);

  const handleCreateNote = async () => {
    const newNote = await addNote({
      title: 'Untitled',
      content: '',
      starred: false,
    });
    router.push(`/notes/${newNote.id}`);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12 ">
      <span className="text-4xl">No file open</span>
      <Button variant="secondary" size="lg" onClick={handleCreateNote}>
        Create file
      </Button>
    </div>
  );
}
