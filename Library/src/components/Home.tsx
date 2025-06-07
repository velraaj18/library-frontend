import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar/>
      {/* <Button onClick={() => navigate("/register")}>Register</Button>
      <Button onClick={() => navigate("/login")}>Login</Button> */}
    </>
  );
}

export default Home
