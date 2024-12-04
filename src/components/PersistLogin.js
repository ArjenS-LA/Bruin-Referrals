import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkRefresh = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error("Error refreshing token: ", error);
      } finally {
        isMounted && setLoading(false);
      }
    };

    !auth?.accessToken ? checkRefresh() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`Loading: ${loading}`);
    console.log(`Auth: ${JSON.stringify(auth?.accessToken)}`);
  }, [loading]);

  return (
    <>{!persist ? <Outlet /> : loading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
