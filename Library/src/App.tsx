import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Task from "./pages/Task";
import Layout from "./pages/Layout"; // ✅ Using Layout for common UI

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Wrapped inside Layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<Task />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
