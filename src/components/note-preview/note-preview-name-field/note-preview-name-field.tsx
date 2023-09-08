import React, {
  type FC,
  type FocusEvent,
  type KeyboardEvent,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { type Note } from '@src/lib/api/notes';
import { cn } from '@src/lib/utils';

export interface NotePreviewNameFieldProps {
  note: Note;
  editing: boolean;
  onRename: (name: string) => void;
  onEditingChange: (active: boolean) => void;
  children?: React.ReactNode;
}

type NotePreviewNameFieldComponent = FC<NotePreviewNameFieldProps> & {
  Actions: typeof NotePreviewNameFieldActions;
};

export const NotePreviewNameField: NotePreviewNameFieldComponent = (props) => {
  const { note, editing, onRename, onEditingChange, children } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(note.title);
  const router = useRouter();
  const isActive = router.asPath === '/notes/' + note.id;

  useEffect(() => {
    setName(note.title);
  }, [note.title]);

  useEffect(() => {
    if (editing) {
      setTimeout(() => {
        ref.current?.focus();
      });
    }
  }, [editing]);

  const handleRename = () => {
    onRename(name);
    onEditingChange(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleRename();
    }
    if (event.key === 'Escape') {
      setName(note.title);
      onEditingChange(false);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length,
    );
  };

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden rounded bg-inherit focus-within:ring-2 focus-within:ring-neutral-300 hover:bg-neutral-700 hover:no-underline dark:focus-within:ring-neutral-600',
        isActive && 'bg-neutral-600 hover:bg-neutral-600',
      )}
    >
      <input
        className="pointer-events-none w-full bg-inherit px-3 py-1 focus:outline-none"
        disabled={!editing}
        ref={ref}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleRename}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      {children}
    </div>
  );
};

const NotePreviewNameFieldActions: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="invisible absolute right-1 top-1/2 -translate-y-1/2 transform group-hover:visible">
      {children}
    </div>
  );
};

NotePreviewNameField.Actions = NotePreviewNameFieldActions;
