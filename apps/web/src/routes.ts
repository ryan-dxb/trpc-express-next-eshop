import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IoCreateOutline, IoHomeOutline } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";

export const useRoutes = () => {
  const pathname = usePathname();

  const dashboardRoutes = useMemo(
    () => [
      {
        label: "Home",
        href: "/dashboard",
        active: pathname === "/dashboard",
        subRoutes: [
          {
            label: "Dashboard",
            href: "/dashboard",
            active: pathname === "/dashboard",
            icon: IoHomeOutline,
          },
        ],
      },
      {
        label: "Products",
        href: "/dashboard/products",
        active: pathname === "/dashboard/products",
        subRoutes: [
          {
            label: "All Products",
            href: "/dashboard/products",
            active: pathname === "/dashboard/products",
            icon: BsPostcard,
          },
          {
            label: "Add New",
            href: "/dashboard/products/add",
            active: pathname === "/dashboard/products/add",
            icon: IoCreateOutline,
          },
        ],
      },
      {
        label: "Posts",
        href: "/dashboard/posts",
        active: pathname === "/dashboard/posts",
        subRoutes: [
          {
            label: "All Posts",
            href: "/dashboard/posts",
            active: pathname === "/dashboard/posts",
            icon: BsPostcard,
          },
          {
            label: "Add New",
            href: "/dashboard/posts/add",
            active: pathname === "/dashboard/posts/add",
            icon: IoCreateOutline,
          },
        ],
      },
      {
        label: "Categories",
        href: "/dashboard/categories",
        active: pathname === "/dashboard/categories",
        subRoutes: [
          {
            label: "All Categories",
            href: "/dashboard/categories",
            active: pathname === "/dashboard/categories",
            icon: BiCategoryAlt,
          },
          {
            label: "Add New",
            href: "/dashboard/categories/add",
            active: pathname === "/dashboard/categories/add",
            icon: IoCreateOutline,
          },
        ],
      },
    ],
    [pathname]
  );

  return { dashboardRoutes };
};

export default useRoutes;
