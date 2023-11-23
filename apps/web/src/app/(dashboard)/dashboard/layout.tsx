import DashboardSidebar from "@/components/dashboard/common/sidebar/Sidebar";
import DashboardHeader from "@/components/dashboard/common/header/Header";
import { FC, ReactNode } from "react";
import DashboardFooter from "@/components/dashboard/common/footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />

      <div className="flex flex-col flex-1">
        <DashboardHeader />

        <main className="flex flex-col flex-1 overflow-hidden">{children}</main>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default Layout;
