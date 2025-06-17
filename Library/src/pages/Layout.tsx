import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNavMenu";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Side Navigation */}
      <aside className="w-44 bg-gray-100 shadow-md">
        <SideNav />
      </aside>

      {/* Right content: Navbar + main page content */}
      <main className="flex-1 flex flex-col">
        <NavBar />
        <div className="p-4">
          <Outlet /> {/* ✅ This renders the current page's content */}
        </div>
      </main>
    </div>
  );
};

export default Layout;
