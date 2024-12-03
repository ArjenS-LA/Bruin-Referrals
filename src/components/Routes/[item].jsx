import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../Icons";
import Home from "../../pages/Home";
import Admin from "../../pages/Admin";
import Login from "../../pages/Login";

/* GROUP MEMBERS: 
    Export all paths from this file [item].jsx */

const Item = (props) => {
  const { page } = props;

  if (page === "home") {
    return <Home />; // CHANGE THIS TO HOME
  } else if (page === "admin") {
    return (
      <div id="page">
        <button className="btn">
          <ArrowBackIcon /> Back to Home
        </button>
        <Admin />
      </div>
    ); // CHANGE THIS TO ADMIN
  } else if (page === "login") {
    return (
      <div id="page">
        <button className="btn">
          <ArrowBackIcon /> Back to Home
        </button>
        <Login />
      </div>
    ); // CHANGE THIS TO ADMIN
  } else {
    return (
      <div id="page">
        <Link to="/">
          <button className="btn">
            <ArrowBackIcon /> Back to Home
          </button>
        </Link>
        {page}
      </div>
    );
  }
};

export default Item;
