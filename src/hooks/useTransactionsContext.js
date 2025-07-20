import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionContext";

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw Error(
      "useTransactionContext must be used inisde a TransactionContextProvider"
    );
  }

  return context;
};
