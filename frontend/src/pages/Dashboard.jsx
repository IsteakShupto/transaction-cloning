import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [text, setText] = useState();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${text}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUsers(res.data.users));
  }, [text]);

  return (
    <div>
      <input
        type="text"
        placeholder="find user to send money"
        onChange={(e) => setText(e.target.value)}
      />

      <div>
        {users &&
          users.map((val, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <p style={{ marginRight: "20px" }}>
                  {val.firstName} - <span>{val.username}</span>
                </p>
                <button
                  onClick={() => {
                    console.log(val);
                    navigate(`/send?to=${val._id}`);
                  }}
                >
                  Send
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
