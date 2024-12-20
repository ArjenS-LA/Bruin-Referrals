import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

/* Preparing User class for authentication */
/* See Dave Gray's React Login Authentication video */
/* Using JWT Access, Refresh Tokens, Cookies, and Axios
(Axios may violate project guidelines, implement skeleton
code to avoid repetitive work*/
const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // Only run when component mounts/loads
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log("Users response: ", response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users: ", error?.response?.data);
        navigate("/login", {
          state: { from: location },
          replace: true,
        });
      }
    };

    getUsers();

    // Cancel any requests when unmount
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []); // Empty dependency array to avoid infinite loop

  // Calling user state with optional chaining
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <u1>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </u1>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
