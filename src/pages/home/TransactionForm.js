import { useState } from "react";
import { useTransactionsContext } from "../../hooks/useTransactionsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function TransactionForm() {
  const { dispatch } = useTransactionsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    setIsPending(true);

    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const transaction = { name, amount };

    const response = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsPending(false);
    }
    if (response.ok) {
      setName("");
      setAmount("");
      setError(null);
      setIsPending(false);
      console.log("New transaction added", json);
      dispatch({ type: "CREATE_TRANSACTION", payload: json });
    }
  };

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        {isPending ? (
          <button disabled>Add Transaction...</button>
        ) : (
          <button>Add Transaction</button>
        )}
      </form>
      {error && <div>Could not add transaction</div>}
    </>
  );
}
