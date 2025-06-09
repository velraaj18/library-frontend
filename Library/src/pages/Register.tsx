import { useState } from "react";
import type { User } from "../interface/User";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

// PrimeReact Components
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Card } from "primereact/card";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        formData
      );
      setMessage({
        type: "success",
        text: response.data.message || "User registered successfully",
      });
      setFormData({ name: "", email: "", password: "" }); // Clear form
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center h-screen bg-amber-50">
        <Card title="Register" className=" mx-auto max-md: w-1/4">
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <br />
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
            <Button type="submit" label="Register" className="mt-3" />
            <br />
            {message && (
              <div className="mt-3">
                <Message severity={message.type} text={message.text} />
              </div>
            )}
            <br />
            <p className=" text-teal-500">Already a User? <span className=" text-red-500 cursor-pointer underline" onClick={() => navigate("/login")}>Click here to Login</span> </p>

          </form>
        </Card>
      </div>
    </>
  );
};

export default Register;
