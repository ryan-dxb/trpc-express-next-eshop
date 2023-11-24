"use client";

import { BubbleMenu, Editor } from "@tiptap/react";
import React, { FC, useCallback } from "react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { IconType } from "react-icons";
import { Button } from "ui";
import InsertLinkModal, { LinkData } from "./InsertLinkModal";
import { validateUrl } from "@/lib/editorUtils";

interface EditLinkProps {
  editor: Editor;
}

const EditLink: FC<EditLinkProps> = ({ editor }) => {
  const getSelectionText = useCallback(() => {
    const { from, to } = editor.state.selection;

    return editor.state.doc.textBetween(from, to);
  }, [editor]);

  const getInitialState = useCallback(() => {
    const { href, target, rel } = editor.getAttributes("link");

    return {
      href: href,
      openInNewTab: target === "_blank" ? true : false,
      rel: rel,
    };
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

  const handleUnlink = (e: any) => {
    e.preventDefault();
    editor.commands.unsetLink();
  };

  const openLink = useCallback(() => {
    const { href } = editor.getAttributes("link");

    window.open(href, "_blank");
  }, [editor]);

  return (
    <BubbleMenu
      className="absolute flex items-center justify-center h-8 px-2 border shadow-sm bg-background"
      editor={editor}
      shouldShow={({ editor }) => editor.isActive("link")}
      tippyOptions={{
        placement: "bottom",
        appendTo: "parent",
      }}
    >
      <div className="flex items-center justify-center space-x-2">
        <BubbleButton icon={BsBoxArrowInUpRight} action={openLink} />

        <InsertLinkModal
          selectedText={getSelectionText()}
          initialState={getInitialState()}
          handleSubmit={handleLinkSubmit}
        >
          <Button
            variant="ghost"
            className="w-6 h-6 p-0 rounded hover:bg-primary hover:text-accent-foreground"
          >
            <LiaEdit className="w-4 h-4" />
          </Button>
        </InsertLinkModal>
        <BubbleButton icon={BiUnlink} action={handleUnlink} />
      </div>
    </BubbleMenu>
  );
};

type BubbleButtonProps = {
  icon: IconType;
  action?: (e: any) => void;
};

const BubbleButton: FC<BubbleButtonProps> = ({ icon: Icon, action }) => {
  return (
    <Button
      onClick={action}
      variant="ghost"
      className="w-6 h-6 p-0 rounded hover:bg-primary hover:text-accent-foreground"
      type="button"
    >
      {<Icon className="w-4 h-4" />}
    </Button>
  );
};

export default EditLink;
