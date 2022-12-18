import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiLogIn } from "react-icons/fi";

import "./Setting.scss";

import { DARK_MODE } from "../../store/type";
import { handleModalSetting } from "../../store/actions";
import ModalSetting from "../../component/Modal/ModalSetting";

function SettingPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { darkMode, user } = useSelector((state) => state.data);

  const token = JSON.parse(localStorage.getItem("token"));

  const handleDarkMode = () => {
    if (darkMode) {
      dispatch({
        type: DARK_MODE,
        payload: false,
      });
      localStorage.setItem("darkmode", false);
    } else {
      dispatch({
        type: DARK_MODE,
        payload: true,
      });
      localStorage.setItem("darkmode", true);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("token", JSON.stringify(null));
    navigate("/login")
  }

  const handleModal = (value) => {
    handleModalSetting(dispatch,value);
  }

  return (
    <div className="h-cus p-x setting">
      <h1 className="setting__title">Setting</h1>

      <div className="setting__wrap">
        {token && (
          <ul className="setting__list">
            <p className="setting__item-title">My account</p>
            <li className="list__item">
              <div className="list__item-infor">
                <span className="infor__title">Username</span>
                <p className="infor__value">{user.name}</p>
              </div>
              <button className="list__item-btn" onClick={() => handleModal({isOpen: true, type: "userName"})}>Edit</button>
            </li>
            <li className="list__item">
              <div className="list__item-infor">
                <span className="infor__title">Password</span>
                <p className="infor__value">******</p>
              </div>
              <button className="list__item-btn" onClick={() => handleModal({isOpen: true, type: "password"})}>Edit</button>
            </li>
          </ul>
        )}

        <ul className="setting__list">
          <p className="setting__item-title">System</p>
          <li className="list__item">
            <div className="list__item-infor">
              <p className="infor__value">Darkmode</p>
            </div>
            <div
              className={`btn__darkmode ${darkMode && "active"}`}
              onClick={handleDarkMode}
            >
              <span className="btn__darkmode-icon"></span>
            </div>
          </li>
        </ul>
        {token ? (
          <button className="setting__btn" onClick={() => handleLogout("/login")}>
            Logout
            <FiLogOut />
          </button>
        ) : (
          <button className="setting__btn" onClick={() => handleLogout("/login")}>
            <FiLogIn />
            Login
          </button>
        )}
      </div>

      <ModalSetting />
    </div>
  );
}

export default SettingPage;
