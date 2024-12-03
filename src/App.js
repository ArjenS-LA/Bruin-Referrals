import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import { DynamicItem, Sidebar, dummyData } from "./components";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const location = useLocation();

  // Define routes where Sidebar should be hidden
  const hiddenSidebarRoutes = ["/", "/login", "/signup"];

  const shouldShowSidebar =
    !hiddenSidebarRoutes.includes(location.pathname) ||
    dummyData?.some((item) => item.path === location.pathname);

  return (
    <div id="main">
      {shouldShowSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {dummyData &&
          dummyData.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={<DynamicItem page={item.name} />}
            />
          ))}
        <Route path="*" element={<DynamicItem page="not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
