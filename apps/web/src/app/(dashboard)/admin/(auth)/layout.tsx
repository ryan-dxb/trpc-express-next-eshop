import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-primary/5">
      {children}
    </div>
  );
};

export default Layout;
