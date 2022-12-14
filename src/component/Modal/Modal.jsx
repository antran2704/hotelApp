import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Modal.scss";
import { handleModalAnnounce } from "../../store/actions";

function Modal() {
    const dispatch = useDispatch();
    const { modalAnnounce } = useSelector((state) => state.data);


    const handleCloseModal = () => {
        handleModalAnnounce(dispatch,false)
    }
  return (
    <div className={`modal ${modalAnnounce && 'open'}`}>
      <div className="modal__bg" onClick = {handleCloseModal}></div>
      <div className="modal__content">
        <div className="modal__close">
          <AiOutlineCloseCircle className="modal__close-icon" onClick = {handleCloseModal}/>
        </div>
        <h2 className="modal__content-title">Please login the application🤗</h2>

        <div className="modal__btn-wrap">
          <Link to={"/login"} className="modal__btn modal__btn-login">Sign in</Link>
          <span className="modal__btn-desc">or</span>
          <Link to={"/signup"} className="modal__btn modal__btn-signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Modal;
