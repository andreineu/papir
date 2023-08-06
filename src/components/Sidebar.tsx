import { NoteList } from './note-list';

export const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-48 bg-neutral-900 p-2">
      <NoteList />
    </div>
  );
};
