import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineLoading3Quarters,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";

import httpRequest from "../../../ultils";
import { getUser, handleModalSetting } from "../../../store/actions";
import {
  checkConfirmPassword,
  checkPassword,
  checkUserName,
} from "../../../helper";
import "../Modal.scss";

function ModalSetting() {
  const dispatch = useDispatch();
  const { modalSetting, user, token } = useSelector((state) => state.data);

  const nameRef = useRef(null);

  const initial = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  }

  const [formValues, setFormValues] = useState(initial)

  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState({
    content: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    handleModalSetting(dispatch, { isOpen: false, type: "" });
    setMessage({
      content: "",
      type: "",
    });

    if(modalSetting.type === "userName") {
      setUserName("");
    } else {
      setFormValues(initial)
    }
  }

  const handleChange = (element) => {
    const {value, name} = element;

      if (message.type === "oldPassword") {
        setFormValues({...formValues, [name]: ""})
        setMessage({
          content: "",
          type: "",
        });
        return;
      }

      if (message.type === "password") {
        setFormValues({...formValues, [name]: ""})
        setMessage({
          content: "",
          type: "",
        });
        return;
      }

      if (message.type === "confirmPassword") {
        setFormValues({...formValues, [name]: ""})
        setMessage({
          content: "",
          type: "",
        });
        return;
      }

    if (name === "userName") {
      setUserName(value);
    }

    setFormValues({...formValues, [name]: value})
  };

  const handleEditUserName = async () => {
    setLoading(true);

    const name = nameRef.current.value;
    const exitUserName = await checkUserName(name);

    if (exitUserName) {
      setMessage({
        content: "user name is already exit!!!",
        type: "userName",
      });
      setLoading(false);
    } else {
      setMessage({
        content: "",
        type: "",
      });

      try {
        await httpRequest.patch(`/user/edit/userName/${user._id}`, {
          name,
        });
        getUser(dispatch, token);
        handleModalSetting(dispatch, { isOpen: false, type: "" });
      } catch (error) {
        console.log("false edit user name!!!");
      }

      setUserName("");
      setLoading(false);
    }
  };

  const handleEditPassword = async () => {
    setLoading(true);

    const oldPassword = formValues.oldPassword.toLowerCase();
    const password = formValues.newPassword.toLowerCase();
    const confirmPasswrod = formValues.confirmPassword.toLowerCase();

    const passwordCorrect = checkPassword(password);
    const confirmCorrect = checkConfirmPassword(password, confirmPasswrod);

    if (oldPassword !== user.password) {
      setMessage({
        content: "Password is incorrect!!!",
        type: "oldPassword",
      });
      setLoading(false);
      return;
    }

    if (oldPassword === password) {
      setMessage({
        content: "Password must be different old password!!!",
        type: "password",
      });
      setLoading(false);
      return;
    }

    if (!passwordCorrect) {
      setMessage({
        content: "Password must be than 6 characters",
        type: "password",
      });
      setLoading(false);
      return;
    }

    if (!confirmCorrect) {
      setMessage({
        content: "Password confirm incorrect🥲",
        type: "confirmPassword",
      });
      setLoading(false);
      return;
    }

    try {
      await httpRequest.patch(`/user/edit/password/${user._id}`, { password });
      getUser(dispatch, token);
      setLoading(false);
      setFormValues(initial);
      handleModalSetting(dispatch, { isOpen: false, type: "" });
    } catch (error) {
      console.log(error, "error in change password!!!");
    }
  };

  return (
    <div className={`modal ${modalSetting.isOpen && "open"}`}>
      <div
        className="modal__bg"
        onClick={() =>
          handleModalSetting(dispatch, { isOpen: false, type: "" })
        }></div>
      <div className="modal__content">
        <h2 className="modal__content-title">Change password</h2>

        {modalSetting.type === "userName" ? (
          <>
            <div className="setting__wrap-content">
              <div className="setting__item">
                <p className="setting__item-title">New user name</p>
                <input
                  ref={nameRef}
                  value={userName}
                  name="userName"
                  type="text"
                  className="setting__item-inp"
                  placeholder="Enter your new user name..."
                  onChange={(e) => handleChange(e.target)}
                />
                <span className="setting__item-error">{message.content}</span>
              </div>
            </div>
            <div className="setting__wrap-btn">
              <button
                className="setting__btn setting__btn--cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="setting__btn setting__btn--save"
                onClick={handleEditUserName}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="setting__wrap-content">
              <div className="setting__item">
                <p className="setting__item-title">password</p>
                <input
                  value={formValues.oldPassword}
                  type="password"
                  name="oldPassword"
                  className="setting__item-inp"
                  placeholder="Enter your password..."
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="setting__item">
                <p className="setting__item-title">Create new password</p>
                <div className="setting__inp-wrap">
                  <input
                    value={formValues.newPassword}
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    className="setting__item-inp"
                    placeholder="Enter new password..."
                    onChange={(e) => handleChange(e.target)}
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      className="login__inp-icon"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <AiFillEye
                      className="login__inp-icon"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </div>
              <div className="setting__item">
                <p className="setting__item-title">Confirm new password</p>
                <input
                  value={formValues.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  className="setting__item-inp"
                  placeholder="Enter new password..."
                  onChange={(e) =>
                    handleChange(e.target)
                  }
                />
                <span className="setting__item-error">{message.content}</span>
              </div>
            </div>
            <div className="setting__wrap-btn">
              <button
                className="setting__btn setting__btn--cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="setting__btn setting__btn--save"
                onClick={handleEditPassword}
              >
                Save
              </button>
            </div>
          </>
        )}
        {loading && (
          <div className="modal__setting-loading">
            <AiOutlineLoading3Quarters className="loading__icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalSetting;
