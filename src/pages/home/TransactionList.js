import styles from "./Home.module.css";
import { useTransactionsContext } from "../../hooks/useTransactionsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function TransactionList({ transactions }) {
  const { dispatch } = useTransactionsContext();
  const { user } = useAuthContext();

  const handleDelete = async (id) => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/transactions/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TRANSACTION", payload: json });
    }
  };

  return (
    <div className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction._id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <span
            className={styles.delete}
            onClick={() => handleDelete(transaction._id)}
          >
            X
          </span>
        </li>
      ))}
    </div>
  );
}
