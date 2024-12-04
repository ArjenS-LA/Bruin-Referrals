import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section>
      <h1>401: Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <button className="btn" onClick={goBack}>
        Previous Page
      </button>
    </section>
  );
};

export default Unauthorized;
