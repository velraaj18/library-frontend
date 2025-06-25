import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { isTokenValid, getUserFromToken } from "../utils/auth";
import { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputSwitch } from "primereact/inputswitch";

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenValid(token)) {
      const user = getUserFromToken();
      setUserName(user?.name || null);
    } else {
      setUserName(null);
    }

    // Set dark mode if already chosen
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName(null);
    navigate("/login");
  };

  const toggleDarkMode = (val: boolean) => {
    console.log(val);

    setDarkMode(val);
    if (val) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const op = useRef<OverlayPanel>(null);

  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
    { label: "Features", icon: "pi pi-star" },
    { label: "Projects", icon: "pi pi-search" },
    { label: "Contact", icon: "pi pi-envelope" },
  ];

  const end = (
    <div className="flex items-center gap-2">
      <Button
        icon="pi pi-cog"
        className="p-button-text p-button-rounded"
        onClick={(e) => op.current?.toggle(e)}
        aria-haspopup
        aria-controls="overlay_panel"
        tooltip="Settings"
      />
      <OverlayPanel ref={op} id="overlay_panel" className="p-3">
        <div className="flex items-center gap-2">
          <span>Dark Mode</span>
          <InputSwitch
            checked={darkMode}
            onChange={(e) => toggleDarkMode(e.value)}
          />
        </div>
      </OverlayPanel>

      {userName ? (
        <>
          <span className="font-medium text-blue-600">Hello, {userName}</span>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            className="p-button-sm p-button-danger"
            onClick={handleLogout}
          />
        </>
      ) : (
        <>
          <Button
            label="Register"
            icon="pi pi-user-plus"
            className="p-button-sm"
            onClick={() => navigate("/register")}
          />
          <Button
            label="Login"
            icon="pi pi-sign-in"
            className="p-button-sm p-button-secondary"
            onClick={() => navigate("/login")}
          />
        </>
      )}
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} end={end} className="dark: bg-cyan-950" />
    </div>
  );
};

export default NavBar;
