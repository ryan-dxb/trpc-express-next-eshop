import Logo from "@/components/common/Logo";
import React, { FC } from "react";

interface DashboardSidebarProps {}

const DashboardSidebar: FC<DashboardSidebarProps> = () => {
  return (
    <div className="flex flex-col flex-shrink-0 w-64 border-r-[.5px]">
      <div className="h-14  border-b-[.5px] flex items-center pl-4">
        <Logo />
      </div>
    </div>
  );
};

export default DashboardSidebar;
