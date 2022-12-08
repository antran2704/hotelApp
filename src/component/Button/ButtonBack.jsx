import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";

function ButtonBack({ redirect }) {
  const navigate = useNavigate();
  return (
    <>
      {redirect ? (
        <Link to={redirect} className="back__btn">
          <BsArrowLeftShort className="back__icon" />
        </Link>
      ) : (
        <button onClick={() => navigate(-1)} className="back__btn">
          <BsArrowLeftShort className="back__icon" />
        </button>
      )}
    </>
  );
}

export default ButtonBack;
