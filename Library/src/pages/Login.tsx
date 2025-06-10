import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";

const Login = () => {
  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData
      );      

      localStorage.setItem("token", response.data.jwtToken);      

      toast.current?.show({
        severity: "success",
        detail: response.data.message || "Logged in successfully",
        summary: "success",
        life: 5000,
      });

      console.log(response.data.message);
      setFormData({ email: "", password: "" }); // Clear form
      navigate("/");
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        detail: error.response?.data?.message || "Something went wrong",
        summary: "error",
        life: 5000,
      });
      console.log(error.response?.data?.message);
    }
  };

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <div className=" flex items-center justify-center h-screen bg-blue-50">
        <Card title="Login" className=" mx-auto max-md: w-1/4">
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="field">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                toggleMask
                feedback={false}
              />
            </div>
            <br />
            <Button type="submit" label="Login" className="mt-3" />
            <br />
            <br />
            <p className=" text-teal-500">
              New User?{" "}
              <span
                className=" text-red-500 cursor-pointer underline"
                onClick={() => navigate("/register")}
              >
                Register Here
              </span>{" "}
            </p>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
