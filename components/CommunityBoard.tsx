import React, { useEffect } from "react";
import EnhancedTable from "../utils/EnhancedTable";
const CommunityBoard = () => {
  return (
    <>
      <div className="bg-none w-full h-screen overflow-hidden m-0 flex flex-col  items-center text-white relative">
        <div className="mt-24 text-center">
          <h1 className="text-5xl uppercase magic">
            <span className="magic-text font-bold">Asset Management Dashboard</span>
          </h1>
          <p className="text-2xl capitalize">
            You take the decision | Authentication
          </p>
        </div>
        <div>
        <EnhancedTable />
        </div>

      </div>
    </>
  );
};

export default CommunityBoard;
