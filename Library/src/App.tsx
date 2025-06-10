import Login from "./pages/Login";
import { Register } from "./pages/Register";
// App.tsx or main.tsx
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Task from "./pages/Task";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task" element={<Task/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
