import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { dummyData } from ".";
import { Sidebar } from ".";

const Layout = () => {
  const location = useLocation();
  const hiddenSidebarRoutes = ["/login", "/signup"];
  const shouldShowSidebar = !hiddenSidebarRoutes.includes(location.pathname);

  return (
    <main className="App">
      {shouldShowSidebar && <Sidebar />}
      <Outlet />
    </main>
  );
};

export default Layout;
