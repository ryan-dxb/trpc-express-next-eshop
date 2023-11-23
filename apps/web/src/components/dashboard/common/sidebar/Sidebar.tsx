import Logo from "@/components/common/Logo";
import React, { FC } from "react";
import { ScrollArea } from "ui";
import SidebarNav from "./SidebarNav";

interface DashboardSidebarProps {}

const DashboardSidebar: FC<DashboardSidebarProps> = () => {
  return (
    <div className="flex flex-col flex-shrink-0 w-64 border-r-[.5px]">
      <div className="h-14  border-b-[.5px] flex items-center pl-4">
        <Logo />
      </div>

      <ScrollArea className="flex-1 ">
        <SidebarNav />
      </ScrollArea>

      <div className="h-14 border-t-[.5px] flex items-center pl-4"></div>
    </div>
  );
};

export default DashboardSidebar;
