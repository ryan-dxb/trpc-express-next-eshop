import DashboardSidebar from "@/components/dashboard/common/sidebar/Sidebar";
import DashboardHeader from "@/components/dashboard/common/sidebar/header/Header";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <DashboardHeader />
    </div>
  );
};

export default Layout;
