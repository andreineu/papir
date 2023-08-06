import { type FC, useEffect, useState } from 'react';

import {
  EditorContent,
  type EditorEvents,
  type JSONContent,
  useEditor,
} from '@tiptap/react';

import { EditorBubbleMenu } from './components';
import { TiptapExtensions } from './extensions';
import { TiptapEditorProps } from './props';

interface EditorProps {
  content?: JSONContent;
  onUpdate?: (props: EditorEvents['update']) => void;
}

export const Editor: FC<EditorProps> = (props) => {
  const { content, onUpdate } = props;

  const [hydrated, setHydrated] = useState(false);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: onUpdate ?? (() => null),
    autofocus: 'end',
  });

  useEffect(() => {
    if (content && editor && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="relative min-h-[500px] w-full max-w-screen-lg"
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};
