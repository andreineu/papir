import { ScrollArea } from '@src/ui-kit';

import { NotePreview } from '../note-preview';
import { useNoteList } from './model';

export const NoteList = () => {
  const { notes } = useNoteList();

  return (
    <ScrollArea className="w-full">
      <div className="flex flex-col gap-1 p-4">
        {notes?.map((note) => (
          <NotePreview key={note.id} note={note} />
        ))}
      </div>
    </ScrollArea>
  );
};
