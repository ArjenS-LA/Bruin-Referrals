import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../Icons";
import Home from "../../pages/Home";
import Admin from "../../pages/Admin";
import Unauthorized from "../../pages/Unauthorized";
//import Login from "../../pages/Login";
//import Signup from "../../pages/SignUp";

const pageComponents = {
  home: Home,
  admin: Admin,
  unauthorized: Unauthorized,
};

const Item = ({ page }) => {
  const PageComponent = pageComponents[page] || null; // Get the matching component or null if not found

  return (
    <div id="page">
      {page !== "home" && (
        <Link to="/">
          <button className="btn">
            <ArrowBackIcon /> Back to Home
          </button>
        </Link>
      )}
      {PageComponent ? (
        <PageComponent />
      ) : (
        <div className="not-found">
          <h1>404</h1>
          <p>The page "{page}" could not be found.</p>
        </div>
      )}
    </div>
  );
};

export default Item;
