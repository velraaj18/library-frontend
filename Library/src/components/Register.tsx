import { useState } from "react";
import type { User } from "../interface/User";
import axios from "axios";

// PrimeReact Components
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Card } from "primereact/card";

export const Register = () => {
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
      <Card
        title="Register"
        style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}
      >
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

          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

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

          <Button type="submit" label="Register" className="mt-3" />

          {message && (
            <div className="mt-3">
              <Message severity={message.type} text={message.text} />
            </div>
          )}
        </form>
      </Card>
    </>
  );
};

export default Register;
