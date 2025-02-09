import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { Loader } from "lucide-react";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default RootLayout;
