import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate  = useNavigate();

     const items: MenuItem[] = [
       {
         label: "Home",
         icon: "pi pi-home",
         command : () => navigate('/contact')
       },
       {
         label: "Features",
         icon: "pi pi-star",
       },
       {
         label: "Projects",
         icon: "pi pi-search",
         items: [
           {
             label: "Components",
             icon: "pi pi-bolt",
           },
           {
             label: "Blocks",
             icon: "pi pi-server",
           },
           {
             label: "UI Kit",
             icon: "pi pi-pencil",
           },
           {
             label: "Templates",
             icon: "pi pi-palette",
             items: [
               {
                 label: "Apollo",
                 icon: "pi pi-palette",
               },
               {
                 label: "Ultima",
                 icon: "pi pi-palette",
               },
             ],
           },
         ],
       },
       {
         label: "Contact",
         icon: "pi pi-envelope",
       },
     ];

       // Buttons on the right-hand side
  const end = (
    <div className=" flex gap-2">
      <Button label="Register" icon="pi pi-user-plus" className="p-button-sm" onClick={() => navigate('/register')} />
      <Button label="Login" icon="pi pi-sign-in" className="p-button-sm p-button-secondary" onClick={() => navigate('/login')} />
    </div>
  );
    
  return (
    <div className='card'>
        <Menubar model={items} end= {end}/>
    </div>
  )
}

export default NavBar