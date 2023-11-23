import React, { FC } from "react";

interface MaxWidthContainerProps {
  children: React.ReactNode;
}

const MaxWidthContainer: FC<MaxWidthContainerProps> = ({ children }) => {
  return (
    <div>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">{children}</div>
    </div>
  );
};

export default MaxWidthContainer;
