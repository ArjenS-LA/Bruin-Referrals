import React from "react";

import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { DynamicItem, Sidebar, dummyData } from "./components";

import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Admin from "./pages/Admin";
import Chatbot from "./Chatbot"

import "./App.css";

const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

function App() {
  const location = useLocation();

  // Define routes where Sidebar should be hidden
  const hiddenSidebarRoutes = ["/login", "/signup", "/unauthorized"];

  const shouldShowSidebar = () =>
    !hiddenSidebarRoutes.includes(location.pathname) ||
    dummyData?.some((item) => item.path === location.pathname);

  console.log(location.pathname);

  return (
    <div className="main">
      {shouldShowSidebar() && <Sidebar />}
      {shouldShowSidebar() && <Chatbot />}
      <Routes>
        {/* <Route
          path="/"
          element={
            <main className="main">
              <Outlet />
            </main>
          }
        /> */}
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Dynamic Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin]} />}>
            <Route path="/admin" element={<DynamicItem page="admin" />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES_LIST.User]} />}>
            <Route path="/" element={<DynamicItem page="home" />} />
            <Route path="/home" element={<DynamicItem page="home" />} />
            {dummyData &&
              dummyData.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  element={<DynamicItem page={item.name} />}
                />
              ))}
          </Route>
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<DynamicItem page="not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
