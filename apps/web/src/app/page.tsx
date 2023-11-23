"use client";
import { NextPage } from "next";
import { Button } from "ui";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return (
    <div className="w-full h-screen">
      <Button>Click me</Button>
    </div>
  );
};

export default Home;
