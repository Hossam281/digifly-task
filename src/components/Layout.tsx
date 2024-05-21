import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center ">
      <Navbar />  
      {children}
    </div>
  );
};



export default Layout;
