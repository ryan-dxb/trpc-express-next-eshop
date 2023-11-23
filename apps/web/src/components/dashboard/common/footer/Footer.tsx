import React, { FC } from "react";

interface DashboardFooterProps {}

const DashboardFooter: FC<DashboardFooterProps> = () => {
  return (
    <footer className="fixed bottom-0 right-0 flex items-center justify-center border-t left-64 h-14">
      <div className="flex flex-col">
        <h3>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="
            "
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-500"
          >
            John Doe
          </a>
        </h3>
      </div>
    </footer>
  );
};

export default DashboardFooter;
