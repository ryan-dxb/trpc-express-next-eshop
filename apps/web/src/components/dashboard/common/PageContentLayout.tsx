import React, { FC } from "react";
import { ScrollArea } from "ui";
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
    <ScrollArea className="w-full pl-4 pr-4 mx-auto my-4 max-w-7xl 2xl:pl-0">
      {children}
    </ScrollArea>
  );
};

export default PageContentLayout;
