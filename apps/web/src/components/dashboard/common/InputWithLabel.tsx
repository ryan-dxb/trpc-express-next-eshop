import React, { ChangeEventHandler, FC } from "react";
import { Input, Label, Textarea } from "ui";

interface InputWithLabelProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "number" | "email" | "password" | "url";
  value?: string | number;
  setValue?:
    | ChangeEventHandler<HTMLInputElement>
    | ChangeEventHandler<HTMLTextAreaElement>
    | undefined;
  disabled?: boolean;
}

const InputWithLabel: FC<InputWithLabelProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  value,
  setValue,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <Label
        htmlFor={name}
        className="text-xs font-medium uppercase text-muted-foreground"
      >
        {label}
      </Label>

      {type === "textarea" ? (
        <Textarea
          id={name}
          className="w-full text-sm focus-visible:ring-offset-0"
          rows={3}
          maxLength={255}
          placeholder={placeholder}
          value={value}
          onChange={setValue as ChangeEventHandler<HTMLTextAreaElement>}
          disabled={disabled}
        />
      ) : (
        <Input
          id={name}
          placeholder={placeholder}
          className="w-full text-sm focus-visible:ring-offset-0"
          type={type}
          value={value}
          onChange={setValue as ChangeEventHandler<HTMLInputElement>}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default InputWithLabel;
