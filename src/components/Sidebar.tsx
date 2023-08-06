import { NoteList } from './note-list';

export const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-48 bg-neutral-200 p-2 text-neutral-200 dark:bg-neutral-800">
      <NoteList />
    </div>
  );
};
