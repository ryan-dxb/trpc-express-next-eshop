"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
} from "ui";

import InputWithLabel from "../../../InputWithLabel";

export type LinkData = {
  href: string;
  openInNewTab: boolean;
  rel?: string;
};

interface InsertLinkModalProps {
  selectedText: string;
  handleSubmit: ({ href, openInNewTab, rel }: LinkData) => void;
  children: React.ReactNode;
  initialState: LinkData;
}

const defaultState = {
  href: "",
  openInNewTab: true,
  rel: "noopener noreferrer nofollow",
};

const InsertLinkModal: FC<InsertLinkModalProps> = ({
  selectedText,
  handleSubmit,
  initialState,
  children,
}) => {
  const [link, setLink] = useState<LinkData>(defaultState);

  const handleSubmitLink = () => {
    handleSubmit(link);
    setLink(defaultState);
  };

  useEffect(() => {
    if (initialState.href) {
      setLink(initialState);
    }

    return () => {
      setLink(defaultState);
    };
  }, [initialState]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Insert/Edit Link</DialogTitle>
          <DialogDescription>
            To insert a link, select the text you want to link, then click the
            link button.
          </DialogDescription>
        </DialogHeader>
        <>
          <InputWithLabel
            value={link.href}
            setValue={(e: any) =>
              setLink((prev) => ({ ...prev, href: e.target.value }))
            }
            label="URL"
            name="href"
          />
          <InputWithLabel
            type="url"
            label="Selected Text"
            name="selectedtext"
            value={selectedText}
            disabled
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="openInNewTab"
              className="rounded"
              defaultChecked={link.openInNewTab}
              onCheckedChange={(e) =>
                setLink((prev) => ({ ...prev, openInNewTab: e as boolean }))
              }
            />
            <Label htmlFor="openInNewTab" className="text-muted-foreground">
              Open in new tab
            </Label>
          </div>
        </>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmitLink}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsertLinkModal;
