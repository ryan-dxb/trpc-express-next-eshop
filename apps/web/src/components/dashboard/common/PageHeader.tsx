import React, { FC } from "react";

interface PageHeaderProps {
  title: string;
  subTitle: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="flex border-b-[.5px] shadow-sm ">
      <div className="w-full mx-auto max-w-7xl">
        <div className="flex p-4 ">
          <div className="flex flex-col ">
            <div className="text-2xl font-semibold">{title}</div>
            <div className="text-sm text-gray-600">{subTitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
