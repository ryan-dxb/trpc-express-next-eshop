import React, { FC } from "react";
import { IconType } from "react-icons";
import { Button, Toggle } from "ui";
import { cn } from "ui/lib/utils";

interface ToggleButtonProps {
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  icon: Icon,
  active,
  onClick,
}) => {
  return (
    <Toggle
      onPressedChange={onClick}
      pressed={active}
      className="w-8 h-8 px-2 bg-transparent hover:text-accent-foreground hover:bg-primary/20
      data-[state=on]:bg-primary/50 data-[state=on]:text-accent-foreground "
    >
      <Icon className="w-5 h-5" />
    </Toggle>
  );
};

export default ToggleButton;
