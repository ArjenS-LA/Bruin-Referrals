import { Link } from "react-router-dom";
import Users from "../components/Users";

const Admin = () => {
  return (
    <div id="admin">
      <h1>Admin Page</h1>
      <br />
      <Users />
      <br />
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Admin;
