import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

import "./Form.scss";
import httpRequest from "../../ultils";
import { Animated } from "react-animated-css";
import {
  checkConfirmPassword,
  checkPassword,
  checkUserName,
} from "../../helper";

function SignUpPage() {
  const navigate = useNavigate();

  const initial = {
    userName: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initial);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorConfirm, setShowErrorConfirm] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setMessage] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (element) => {
    const { value, name } = element;

    element.classList.remove("error");
    element.classList.remove("success");

    if (
      (showError || showErrorConfirm) &&
      (name === "password" || name === "confirmPassword")
    ) {
      setShowErrorConfirm(false);
      setShowError(false);
      setFormValues({ ...formValues, [name]: "" });
      return;
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckUserName = async (element) => {
    const { value } = element;

    if (value.length > 0) {
      const user = await checkUserName(value);

      if (user) {
        element.classList.add("error");
        element.classList.remove("success");
        setNameError(true);
        setMessage("User name exit");
      } else {
        element.classList.add("success");
        element.classList.remove("error");
        setNameError(false);
      }
    }
  };

  const handleCheckPassword = (element) => {
    const { value } = element;
    const isError = checkPassword(value);

    if (!isError) {
      element.classList.add("error");
      element.classList.remove("success");
      setShowError(true);
    } else {
      element.classList.remove("error");
      element.classList.add("success");
      setShowError(false);
    }
  };

  const handleCheckConfirmPassword = (element) => {
    const { password, confirmPassword } = formValues;

    const isError = checkConfirmPassword(password, confirmPassword);

    if (!isError) {
      element.classList.remove("success");
      element.classList.add("error");
      setShowErrorConfirm(true);
    } else {
      element.classList.remove("error");
      element.classList.add("success");
      setShowErrorConfirm(false);
    }
  };

  const handleSignUp = async () => {
    const { userName, password ,confirmPassword} = formValues;
    if (userName.length === 0) {
      setNameError(true);
      setMessage("Field is required");
      return;
    }

    if (password.length === 0) {
      setShowError(true);
      return;
    }

    if (confirmPassword.length === 0) {
      setShowErrorConfirm(true);
      return;
    }

    if (
      userName.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      setLoading(true);
      await httpRequest.post("/user/add", {
        name: userName,
        password: password.toLowerCase(),
      });
      setLoading(false);
      navigate("/login");
    }
  };

  return (
    <div className="h-cus p-x login">
      <Animated animationIn="zoomIn">
        <h1 className="login__title">Sign Up</h1>
        <p className="login__desc">Sign up your account!!!</p>
      </Animated>

      <div className="login__content">
        <Animated
          animationIn="fadeInUp"
          animationInDelay={1200}
          className="login__content-item"
        >
          <span className="item__title">User name</span>
          <input
            className="login__inp"
            type="text"
            name="userName"
            value={formValues.userName}
            placeholder="Enter your user name..."
            onChange={(e) => {
              setNameError(false);
              handleInput(e.target);
            }}
            onBlur={(e) => handleCheckUserName(e.target)}
          />
          {nameError && <p className="login__error">{nameErrorMessage}😕</p>}
        </Animated>
        <Animated
          animationIn="fadeInUp"
          animationInDelay={1400}
          className="login__content-item"
        >
          <span className="item__title">Password</span>
          <div className="login__inp-wrap">
            <input
              className="login__inp"
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              value={formValues.password}
              onChange={(e) => handleInput(e.target)}
              onBlur={(e) => handleCheckPassword(e.target)}
              placeholder="Enter your password..."
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
          {showError && (
            <p className="login__error">Password must be than 6 characters</p>
          )}
        </Animated>
        <Animated
          animationIn="fadeInUp"
          animationInDelay={1600}
          className="login__content-item"
        >
          <span className="item__title">Confirm password</span>
          <div className="login__inp-wrap">
            <input
              className="login__inp"
              name="confirmPassword"
              type={`${showPassword ? "text" : "password"}`}
              value={formValues.confirmPassword}
              onChange={(e) => handleInput(e.target)}
              onBlur={(e) => handleCheckConfirmPassword(e.target)}
            />
          </div>
        </Animated>
        {showErrorConfirm && (
          <p className="login__error">Password confirm incorrect🥲</p>
        )}
      </div>

      <Animated
        animationIn="zoomIn"
        animationInDelay={1800}
        animationInDuration={1200}
      >
        <button className="login__btn" onClick={handleSignUp}>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="login__btn-loading" />
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="login__redirect">
          Already a member?
          <Link to={"/login"} className="login__redirec-link">
            Login
          </Link>
        </p>
      </Animated>
    </div>
  );
}

export default SignUpPage;
