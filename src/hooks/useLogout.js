import { useAuthContext } from "./useAuthContext";
import { useTransactionsContext } from "./useTransactionsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: tDispatch } = useTransactionsContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    tDispatch({ type: "SET_TRANSACTIONS", payload: null });
  };

  return { logout };
};
