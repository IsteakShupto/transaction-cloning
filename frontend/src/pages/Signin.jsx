import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div>
      <input
        type="email"
        placeholder="enter email"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Signin</button>
    </div>
  );
}
