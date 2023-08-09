import { useRouter } from 'next/router';

import { useNoteAddMutation } from '@src/lib/hooks/note.hooks';
import { Button } from '@src/ui-kit';

export default function Home() {
  const router = useRouter();

  const { mutateAsync } = useNoteAddMutation();
  const handleCreateNote = async () => {
    const newNote = await mutateAsync({ title: 'Untitled', content: '' });
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
