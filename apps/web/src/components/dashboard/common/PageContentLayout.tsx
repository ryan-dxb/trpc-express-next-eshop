import React, { FC } from "react";
import { cn } from "ui/lib/utils";

interface PageContentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageContentLayout: FC<PageContentLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("max-w-7xl w-full mx-auto px-4 my-4 ")}>{children}</div>
  );
};

export default PageContentLayout;
