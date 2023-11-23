"use client";

import React, { FC } from "react";
import useRoutes from "@/routes";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarNavProps {}

const SidebarNav: FC<SidebarNavProps> = () => {
  const { dashboardRoutes } = useRoutes();

  return (
    <nav className="p-4">
      <ul>
        {dashboardRoutes.map((route) => (
          <SidebarNavItem key={route.label} route={route} />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
