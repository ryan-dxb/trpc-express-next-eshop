"use client";

import React, { FC } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "ui/lib/utils";
import { Label } from "ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui";
import { BsPlug, BsBook, BsPlusLg } from "react-icons/bs";
import { MdComputer, MdOutlineKitchen, MdOutlineToys } from "react-icons/md";
import { GiLipstick, GiClothes } from "react-icons/gi";
import { MdSportsSoccer } from "react-icons/md";
import { IoCarSportOutline, IoGameControllerOutline } from "react-icons/io5";
import { BsChevronRight } from "react-icons/bs";
import { ScrollArea } from "ui";

interface CategoryDropDownProps {}
const categoriesData = [
  {
    id: "electronics",
    name: "Electronics",
    icon: <BsPlug />,
    link: "/search/category/electronics",
  },
  {
    id: "computers",
    name: "Computers",
    icon: <MdComputer />,
    link: "/search/category/computers",
  },
  {
    id: "home",
    name: "Home & Kitchen",
    icon: <MdOutlineKitchen />,
    link: "/search/category/home",
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: <MdOutlineToys />,
    link: "/search/category/toys",
  },
  {
    id: "books",
    name: "Books",
    icon: <BsBook />,
    link: "/search/category/books",
  },
  {
    id: "beauty",
    name: "Beauty & Health",
    icon: <GiLipstick />,
    link: "/search/category/beauty",
  },
  {
    id: "clothing",
    name: "Clothing",
    icon: <GiClothes />,
    link: "/search/category/clothing",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: <MdSportsSoccer />,
    link: "/search/category/sports",
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: <IoCarSportOutline />,
    link: "/search/category/automotive",
  },
  {
    id: "gaming",
    name: "Gaming & Consoles",
    icon: <IoGameControllerOutline />,
    link: "/search/category/gaming",
  },
  {
    id: "more",
    name: "More Categories",
    icon: <BsPlusLg />,
    link: "/search/category/all",
  },
];

const CategoryDropDown: FC<CategoryDropDownProps> = () => {
  return (
    <div>
      <Label className="text-xs font-medium uppercase text-muted-foreground">
        Category
      </Label>

      <Select>
        <SelectTrigger className="w-full focus-visible:ring-offset-0 placeholder:text-muted-foreground focus:ring-offset-0 active:ring-offset-0">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="overflow-y-auto h-60">
          <ScrollArea className="h-60">
            {categoriesData.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-row items-center space-x-4">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryDropDown;
