import { Link } from "react-router-dom";
import Users from "../components/Users/Users";

const Admin = () => {
  return (
    <div id="admin">
      <Link to="/"></Link>
      <Users />
    </div>
  );
};

export default Admin;
