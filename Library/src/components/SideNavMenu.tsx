import type { MenuItem } from "primereact/menuitem";
import { PanelMenu } from "primereact/panelmenu";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/dashboard"),
    },
    {
      label: "Tasks",
      icon: "pi pi-tasks",
      items: [
        {
          label: "All Tasks",
          icon: "pi pi-list",
          command: () => navigate("/task"),
        },
        {
          label: "Create Task",
          icon: "pi pi-plus",
          command: () => navigate("/tasks/create"),
        },
        {
          label: "Today's Tasks",
          icon: "pi pi-calendar",
          command: () => navigate("/tasks/today"),
        },
      ],
    },
    {
      label: "Help",
      icon: "pi pi-question-circle",
      command: () => navigate("/help"),
    },
  ];

  return (
    <div className="w-44 mt-16 p-0">
      <PanelMenu model={items} />
    </div>
  );
};

export default SideNav;
