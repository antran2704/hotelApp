import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";

function ButtonBack({ redirect, left = 0 }) {
  const navigate = useNavigate();
  return (
    <>
      {redirect ? (
        <Link to={redirect} style = {{left: `${left}px`}} className="back__btn">
          <BsArrowLeftShort className="back__icon" />
        </Link>
      ) : (
        <button onClick={() => navigate(-1)} style = {{left: `${left}px`}} className="back__btn">
          <BsArrowLeftShort className="back__icon" />
        </button>
      )}
    </>
  );
}

export default ButtonBack;
