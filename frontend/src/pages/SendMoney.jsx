import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SendMoney() {
  const [amount, setAmount] = useState();
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to");

  return (
    <div>
      <input
        type="number"
        placeholder="write amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={() => {
          axios
            .post(
              "http://localhost:3000/api/v1/account/transfer",
              {
                to: to,
                amount: parseInt(amount),
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => console.log(res));
        }}
      >
        Send amount
      </button>
    </div>
  );
}
