import { type FC, useEffect, useState } from 'react';

import {
  EditorContent,
  type EditorEvents,
  type HTMLContent,
  generateJSON,
  useEditor,
} from '@tiptap/react';
import { useRouter } from 'next/router';

import { EditorBubbleMenu } from './components';
import { TiptapExtensions } from './extensions';
import { TiptapEditorProps } from './props';

interface EditorProps {
  content: HTMLContent;
  onUpdate?: (props: EditorEvents['update']) => void;
}

export const Editor: FC<EditorProps> = (props) => {
  const { content, onUpdate } = props;
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: onUpdate ?? (() => null),
    autofocus: 'end',
  });

  useEffect(() => {
    const onRouteChange = () => {
      setHydrated(false);
    };

    router.events.on('routeChangeComplete', onRouteChange);

    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (editor && !hydrated) {
      const output = generateJSON(content, TiptapExtensions);
      editor.commands.setContent(output);
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
