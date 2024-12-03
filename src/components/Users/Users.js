import { useState, useEffect } from "react";
import axios from "../../api/axios";

/* Preparing User class for authentication */
/* See Dave Gray's React Login Authentication video */
/* Using JWT Access, Refresh Tokens, Cookies, and Axios
(Axios may violate project guidelines, implement skeleton
code to avoid repetitive work*/
const Users = () => {
  const [users, setUsers] = useState();

  // Only run when component mounts/loads
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users: ", error);
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
