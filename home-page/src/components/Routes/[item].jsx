import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../Icons";
import Home from "../../pages/Home";

/* GROUP MEMBERS: 
    Export all paths from this file [item].jsx */

const Item = (props) => {
  const { page } = props;

  if (page === "home") {
    return <Home />;
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
