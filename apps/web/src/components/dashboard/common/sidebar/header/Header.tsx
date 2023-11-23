import React, { FC } from "react";
import { Button, Input, Separator } from "ui";
import { Search, Mail, Bell, Settings } from "lucide-react";

interface DashboardHeaderProps {}

const DashboardHeader: FC<DashboardHeaderProps> = () => {
  return (
    <div className="flex h-14 border-b-[.5px] flex-1 items-center px-4 justify-between">
      {/* Search Bar */}

      <div className="flex h-10 border w-80">
        <Input
          placeholder="Search"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-primary"
        />
        <Button className="w-10 h-10 px-3">
          <Search size={20} />
        </Button>
      </div>
      {/* Icons */}
      <div className="flex flex-row gap-x-3">
        <Button
          variant="ghost"
          className="w-10 h-10 p-0 text-gray-600 rounded-full"
        >
          <Mail className="w-5 h-5 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          className="w-10 h-10 p-0 text-gray-600 rounded-full"
        >
          <Bell className="w-5 h-5 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          className="w-10 h-10 p-0 text-gray-600 rounded-full"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>

        <Separator className="h-8 mx-4 my-auto" orientation="vertical" />
      </div>
    </div>
  );
};

export default DashboardHeader;
