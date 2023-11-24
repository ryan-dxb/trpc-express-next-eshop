import { getFocusedEditor } from "@/lib/editorUtils";
import React, { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "ui";

interface dropDownOptions {
  label: string;
  value: string;
  onClick: () => void;
}

interface HeadingDropDownProps {
  options: dropDownOptions[];
}

const HeadingDropDown: FC<HeadingDropDownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  return (
    <Select
      defaultValue={selectedOption}
      value={selectedOption}
      onValueChange={(value) => {
        const option = options.find((option) => option.value === value);
        option?.onClick();

        setSelectedOption(value);
      }}
    >
      <SelectTrigger className="w-[180px] focus-visible:ring-0 focus:ring-0 active:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              onClick={option.onClick}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default HeadingDropDown;
