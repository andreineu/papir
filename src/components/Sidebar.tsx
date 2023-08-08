import { NoteList } from './note-list';
import { User } from './user';

export const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 flex w-48 flex-col bg-neutral-200 p-2 text-neutral-200 dark:bg-neutral-800">
      <NoteList />
      <div className="mt-auto flex justify-center">
        <User />
      </div>
    </div>
  );
};
