import React, { FC } from "react";
import { cn } from "ui/lib/utils";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <div className="flex flex-row items-center gap-x-2 ">
      <div
        className={cn(
          `flex items-center justify-center w-10 h-10 bg-primary rounded-md`
        )}
      >
        <p className="text-lg font-bold text-white">SA</p>
      </div>
      <p className="pr-2 text-2xl font-semibold tracking-tighter uppercase text-primary">
        Smart Admin
      </p>
    </div>
  );
};

export default Logo;
