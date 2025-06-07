import { useState } from "react";
import axios from "axios";


const Login = () => {

    const [formData, setFormData] = useState({
        email : "",
        password : ""
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setFormData({
        ...formData, [e.target.name] : e.target.value
      })
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5001/api/auth/login", formData);
        setMessage(response?.data?.message)
      } catch (error : any) {
        setMessage(error.response?.data?.message || "Something went wrong");
      }
      
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
          <input type="text" name = "email" placeholder="Email" onChange={handleChange}/> <br />
          <input type="text" name = "password" placeholder="Password" onChange={handleChange}/> <br />
          <button type="submit">Submit</button><br />
      </form>
      <p>{message}</p>
    </>
  )
}

export default Login