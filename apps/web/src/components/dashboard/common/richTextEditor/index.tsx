"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import TiptapImage from "@tiptap/extension-image";
import { EditorContent, getMarkRange, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { FC, useEffect, useState } from "react";
import EditorToolbar from "./toolbar";
import { createLowlight, common, all } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlockPrism from "tiptap-extension-code-block-prism";
import CodeBlock from "@tiptap/extension-code-block";
import EditLink from "./toolbar/Link/EditLink";

interface RichTextEditorProps {}

const lowlight = createLowlight(all);

lowlight.register({ ...common, ...all });

const RichTextEditor: FC<RichTextEditorProps> = () => {
  const [selectionRange, setSelectionRange] = useState<>();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "You can write your full product description here...",
      }),
      Link.extend({
        inclusive: false,
      }).configure({
        autolink: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",

          class: "text-primary underline",
        },
        linkOnPaste: true,
      }),
      Youtube.configure({
        inline: true,

        HTMLAttributes: {
          class: "w-full mx-auto aspect-w-16 aspect-h-9",
        },
      }),

      TiptapImage,
      CodeBlock,

      CodeBlockLowlight.configure({
        HTMLAttributes: {
          class: "rounded-md",
        },
        lowlight,
      }),
    ],

    editorProps: {
      handleClick(view, pos, event) {
        const state = view.state;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );

        if (selectionRange) {
          setSelectionRange(selectionRange);
        }
      },

      attributes: {
        class:
          "prose dark:prose-invert prose-sm max-w-prose focus:outline-none focus:border-none w-full py-4 mx-auto ",
      },
    },
  });

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }

    return () => {
      setSelectionRange(undefined);
    };
  }, [editor, selectionRange]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center px-4 overflow-x-auto overflow-y-hidden border border-b-0 h-14">
        {editor && <EditorToolbar editor={editor} />}
      </div>
      {editor ? <EditLink editor={editor} /> : null}
      <div className="flex flex-col w-full overflow-hidden overflow-y-scroll border h-60">
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
};

export default RichTextEditor;
