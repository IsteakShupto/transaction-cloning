import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [pass, setPass] = useState("");

  const handleClick = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username: email,
        firstName: fn,
        lastName: ln,
        password: pass,
      }
    );

    console.log(response);
  };

  return (
    <div>
      <div>
        <input
          type="email"
          placeholder="username"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 rounded-md p-2"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="firstName"
          onChange={(e) => setFn(e.target.value)}
          className="border-2 rounded-md p-2"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="lastName"
          onChange={(e) => setLn(e.target.value)}
          className="border-2 rounded-md p-2"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPass(e.target.value)}
          className="border-2 rounded-md p-2"
        />
      </div>
      <button onClick={handleClick} className="bg-black text-white p-2">
        Submit
      </button>
    </div>
  );
}
