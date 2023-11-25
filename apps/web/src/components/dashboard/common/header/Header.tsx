import React, { FC } from "react";
import { Avatar, AvatarFallback, Button, Input, Separator } from "ui";
import { Search, Mail, Bell, Settings, ChevronDown } from "lucide-react";

interface DashboardHeaderProps {}

const DashboardHeader: FC<DashboardHeaderProps> = () => {
  return (
    <div className="fixed w-full pl-64">
      {/* Search Bar */}
      <div className="flex h-14 border-b-[.5px] items-center px-4  justify-between">
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

          <div className="flex flex-row items-center space-x-2 cursor-pointer">
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>

            <div className="flex flex-col ">
              <span className="text-sm font-semibold">Adeola Adeyemo</span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>

            <Button
              variant="ghost"
              className="w-10 h-10 p-0 text-gray-600 rounded-full hover:bg-transparent "
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
