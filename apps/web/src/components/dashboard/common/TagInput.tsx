import React, { FC } from "react";
import { Input, Label } from "ui";
import { X } from "lucide-react";

interface TagInputProps {}

const TagInput: FC<TagInputProps> = () => {
  return (
    <div>
      <Label className="text-xs font-medium uppercase text-muted-foreground">
        Tags:
      </Label>

      <div className="flex flex-row flex-wrap gap-2 pb-3">
        <div className="flex flex-row items-center px-2 py-1 text-xs rounded-full gap-x-2 bg-primary/50">
          <span>React</span>
          <span className="text-red-500">
            <X className="w-4 h-4" />
          </span>
        </div>
        <div className="flex flex-row items-center px-2 py-1 text-xs rounded-full gap-x-2 bg-primary/50">
          <span>React</span>
          <span className="text-red-500">
            <X className="w-4 h-4" />
          </span>
        </div>
        <div className="flex flex-row items-center px-2 py-1 text-xs rounded-full gap-x-2 bg-primary/50">
          <span>React</span>
          <span className="text-red-500">
            <X className="w-4 h-4" />
          </span>
        </div>
        <div className="flex flex-row items-center px-2 py-1 text-xs rounded-full gap-x-2 bg-primary/50">
          <span>React</span>
          <span className="text-red-500">
            <X className="w-4 h-4" />
          </span>
        </div>
        <div className="flex flex-row items-center px-2 py-1 text-xs rounded-full gap-x-2 bg-primary/50">
          <span>React</span>
          <span className="text-red-500">
            <X className="w-4 h-4" />
          </span>
        </div>
        <div className="flex flex-row items-center px-2 py-1 text-xs rounded-full gap-x-2 bg-primary/50">
          <span>React</span>
          <span className="text-red-500">
            <X className="w-4 h-4" />
          </span>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Add a tag"
        className="focus-visible:ring-offset-0 active:ring-offset-0 focus:ring-offset-0"
      />
    </div>
  );
};

export default TagInput;
