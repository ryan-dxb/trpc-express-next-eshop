"use client";

import React, { FC, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "ui";

interface EmbedYoutubeProps {
  handleSubmit: (url: string) => void;
}

const EmbedYoutube: FC<EmbedYoutubeProps> = ({ handleSubmit }) => {
  const [url, setUrl] = useState("");

  const handleSubmitUrl = () => {
    handleSubmit(url);
    setUrl("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-8 h-8 px-0 bg-transparent rounded hover:text-accent-foreground hover:bg-primary"
        >
          <AiOutlineYoutube className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-row mt-3 space-x-2 w-80" align="end">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Youtube URL"
          className="h-10 w-60 focus-visible:ring-0 focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:border-none focus:border-none"
        />
        <Button
          onClick={handleSubmitUrl}
          variant="default"
          className="w-10 h-10 p-0 m-0 rounded"
        >
          <IoAdd className="w-5 h-5" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default EmbedYoutube;
