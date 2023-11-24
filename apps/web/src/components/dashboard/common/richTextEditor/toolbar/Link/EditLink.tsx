"use client";

import { BubbleMenu, Editor } from "@tiptap/react";
import React, { FC, useCallback } from "react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { IconType } from "react-icons";
import { Button } from "ui";
import InsertLinkModal, { LinkData } from "./InsertLinkModal";

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
    console.log(href);

    if (openInNewTab) {
      editor.commands.setLink({
        href: href,
        target: "_blank",
        rel: rel ?? "noopener noreferrer nofollow",
      });
    } else {
      editor.commands.setLink({
        href: href,
        target: "_self",
        rel: rel ?? "noopener noreferrer nofollow",
      });
    }
  };

  const handleUnlink = () => {
    editor.commands.unsetLink();
  };

  const openLink = useCallback(() => {
    const { href } = editor.getAttributes("link");
    window.open(href, "_blank");
  }, [editor]);

  return (
    <BubbleMenu
      className="absolute flex items-center justify-center h-8 px-2 translate-x-1/2 border shadow-sm -top-7 right-1/2 bg-primary/5"
      editor={editor}
    >
      <div className="flex items-center justify-center space-x-2">
        <BubbleButton icon={BsBoxArrowInUpRight} action={openLink} />

        <InsertLinkModal
          selectedText={getSelectionText()}
          initialState={getInitialState()}
          handleSubmit={handleLinkSubmit}
        >
          <BubbleButton icon={LiaEdit} />
        </InsertLinkModal>
        <BubbleButton icon={BiUnlink} action={handleUnlink} />
      </div>
    </BubbleMenu>
  );
};

type BubbleButtonProps = {
  icon: IconType;
  action?: () => void;
};

const BubbleButton: FC<BubbleButtonProps> = ({ icon: Icon, action }) => {
  return (
    <Button
      onClick={action}
      variant="ghost"
      className="w-6 h-6 p-0 rounded hover:bg-primary hover:text-accent-foreground"
    >
      {<Icon className="w-4 h-4" />}
    </Button>
  );
};

export default EditLink;
