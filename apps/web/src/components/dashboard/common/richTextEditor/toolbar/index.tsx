"use client";

import React, { FC, useCallback } from "react";
import { Editor } from "@tiptap/react";
import ToggleButton from "./ToggleButton";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { BsBraces } from "react-icons/bs";
import { getFocusedEditor, validateUrl } from "@/lib/editorUtils";
import HeadingDropDown from "./HeadingDropDown";
import { Button, Separator } from "ui";
import InsertLinkModal, { LinkData } from "./Link/InsertLinkModal";
import EmbedYoutube from "./EmbedYoutube";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar: FC<EditorToolbarProps> = ({ editor }) => {
  const headerOptions = [
    {
      label: "Paragraph",
      value: "paragraph",
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: "Heading 1",
      value: "heading1",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      value: "heading2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      value: "heading3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];

  //  LINK MODAL
  const getSelectionText = useCallback(() => {
    const { from, to } = editor.state.selection;

    return editor.state.doc.textBetween(from, to);
  }, [editor]);

  const handleLinkSubmit = ({ href, openInNewTab, rel }: LinkData) => {
    if (openInNewTab) {
      editor.commands.setLink({
        href: validateUrl(href),
        target: "_blank",
        rel: rel ?? "noopener noreferrer nofollow",
      });
    } else {
      editor.commands.setLink({
        href: validateUrl(href),
        target: "_self",
        rel: rel ?? "noopener noreferrer nofollow",
      });
    }
  };

  const getInitialState = useCallback(() => {
    const { href, target, rel } = editor.getAttributes("link");

    return {
      href: href,
      openInNewTab: target === "_blank" ? true : false,
      rel: rel,
    };
  }, [editor]);

  // END LINK MODAL

  // YOUTUBE MODAL
  const handleYoutubeVideo = (url: string) => {
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };
  // END YOUTUBE MODAL

  return (
    <div className="flex flex-row items-center gap-3">
      <div className="flex flex-row gap-1">
        <ToggleButton
          icon={AiOutlineBold}
          active={editor.isActive("bold")}
          onClick={() => getFocusedEditor(editor).toggleBold().run()}
        />
        <ToggleButton
          icon={AiOutlineItalic}
          active={editor.isActive("italic")}
          onClick={() => getFocusedEditor(editor).toggleItalic().run()}
        />
        <ToggleButton
          icon={AiOutlineUnderline}
          active={editor.isActive("underline")}
          onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
        />
        <ToggleButton
          icon={AiOutlineStrikethrough}
          active={editor.isActive("strike")}
          onClick={() => getFocusedEditor(editor).toggleStrike().run()}
        />
      </div>

      <HeadingDropDown options={headerOptions} />

      <div className="flex flex-row gap-1">
        <ToggleButton
          icon={AiOutlineOrderedList}
          active={editor.isActive("orderedList")}
          onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
        />
        <ToggleButton
          icon={AiOutlineUnorderedList}
          active={editor.isActive("bulletList")}
          onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex flex-row gap-1">
        <ToggleButton
          icon={RiDoubleQuotesL}
          active={editor.isActive("blockquote")}
          onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
        />
        <ToggleButton
          icon={BsBraces}
          active={editor.isActive("codeBlock")}
          onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex flex-row gap-1">
        <InsertLinkModal
          selectedText={getSelectionText()}
          handleSubmit={handleLinkSubmit}
          initialState={getInitialState()}
        >
          <Button
            variant="ghost"
            className="w-8 h-8 px-2 bg-transparent hover:text-accent-foreground hover:bg-primary/20 "
          >
            <BsLink45Deg className="w-5 h-5" />
          </Button>
        </InsertLinkModal>

        <EmbedYoutube handleSubmit={handleYoutubeVideo} />
      </div>
    </div>
  );
};

export default EditorToolbar;
