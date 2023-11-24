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

      <DashboardHeader />

      <main className="flex flex-col flex-1 py-14">{children}</main>

      <DashboardFooter />
    </div>
  );
};

export default Layout;
