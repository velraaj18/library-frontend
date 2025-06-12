import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNavMenu";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Side Navigation on the left */}
      <aside className="w-44 bg-gray-100 shadow-md">
        <SideNav />
      </aside>

      {/* Right content: Navbar on top + main content */}
      <main className="flex-1 flex flex-col">
        {/* Top NavBar */}     
          <NavBar />       
      </main>
    </div>
  );
};

export default Home;
