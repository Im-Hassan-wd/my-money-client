import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIspending] = useState(null);

  const login = async (email, password) => {
    setIspending(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    console.log(json);

    if (!response.ok) {
      setIspending(false);
      setError(json.error);
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // upadate auth context (user)
      dispatch({ type: "LOGIN", payload: json });

      setIspending(false);
    }
  };

  return { login, isPending, error };
};
