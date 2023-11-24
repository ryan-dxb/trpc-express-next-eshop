import { Editor } from "@tiptap/react";

export const getFocusedEditor = (editor: Editor) => {
  return editor.chain().focus();
};
