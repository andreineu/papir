import { type FC, useEffect } from 'react';

import {
  EditorContent,
  type EditorEvents,
  type HTMLContent,
  generateJSON,
  useEditor,
} from '@tiptap/react';

import { EditorBubbleMenu } from './components';
import { TiptapExtensions } from './extensions';
import { TiptapEditorProps } from './props';

interface EditorProps {
  content: HTMLContent;
  onUpdate?: (props: EditorEvents['update']) => void;
}

export const Editor: FC<EditorProps> = (props) => {
  const { content, onUpdate } = props;

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: onUpdate ?? (() => null),
    autofocus: 'end',
    // content,
  });

  useEffect(() => {
    if (content && editor) {
      const output = generateJSON(content, TiptapExtensions);
      editor.commands.setContent(output);
    }
  }, [editor, content]);

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
