import { useEffect } from "react";
import { useTransactionsContext } from "../../hooks/useTransactionsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import styles from "./Home.module.css";

// components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export default function Home() {
  const { transactions, dispatch } = useTransactionsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TRANSACTIONS", payload: json });
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [dispatch, user]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {transactions && <TransactionList transactions={transactions} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
}
