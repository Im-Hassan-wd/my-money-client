import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIspending] = useState(null);

  const controller = new AbortController();

  const login = async (email, password) => {
    setIspending(true);
    setError(null);

    const response = await fetch(
      "/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ email, password }),
      },
      { signal: controller.signal }
    );
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

    return () => {
      controller.abort();
    };
  };

  return { login, isPending, error };
};
