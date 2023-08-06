import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
} from 'react';

import { type Editor } from '@tiptap/core';
import { Check, Trash } from 'lucide-react';

import { cn } from '@src/lib/utils';

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = (props) => {
  const { editor, isOpen, setIsOpen } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  return (
    <div className="relative">
      <button
        className="flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className="text-base">↗</p>
        <p
          className={cn('underline decoration-neutral-400 underline-offset-4', {
            'text-blue-500': editor.isActive('link'),
          })}
        >
          Link
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = inputRef.current;
            editor
              .chain()
              .focus()
              .setLink({ href: input?.value ?? '' })
              .run();
            setIsOpen(false);
          }}
          className="fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-neutral-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <input
            ref={inputRef}
            type="url"
            placeholder="Paste a link"
            className="flex-1 bg-transparent p-1 text-sm outline-none"
            defaultValue={(editor.getAttributes('link').href ?? '') as string}
          />
          {editor.getAttributes('link').href ? (
            <button
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </button>
          ) : (
            <button className="flex items-center rounded-sm p-1 text-neutral-600 transition-all hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
              <Check className="h-4 w-4" />
            </button>
          )}
        </form>
      )}
    </div>
  );
};
