import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

import "./Form.scss";
import httpRequest from "../../ultils";
import { Animated } from "react-animated-css";

function SignUpPage() {
  const navigate = useNavigate();

  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorConfirm, setShowErrorConfirm] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setMessage] = useState("")

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (value) => {
    passwordRef.current.classList.remove("error");
    setPassword(value);
    setShowErrorConfirm(false);
    setShowError(false);

    if (showError) {
      setPassword("");
    }
  };

  const handleCheckUserName = async (e) => {
    const name = e.target.value;
    const el = e.target;
    if (name.length > 0) {
      const nameUser = await httpRequest.post("/user/checkNameUser", { name });
      if (nameUser.data._id) {
        setNameError(true);
        setMessage('User name exit');
        el.classList.add("error");
        el.classList.remove("success");
      } else {
        setNameError(false);
        el.classList.add("success");
        el.classList.remove("error");
      }
    }
  };

  const handleCheckPassword = () => {
    const el = passwordRef.current;

    if (el.value.length > 0) {
      if (el.value.length < 6) {
        setShowError(true);
        el.classList.add("error");
        el.classList.remove("success");
      } else {
        setShowError(false);
        el.classList.remove("error");
        el.classList.add("success");
      }
    }
  };

  const handleCheckConfirmPassword = () => {
    const el = passwordConfirmRef.current;
    if (el.value.length > 0) {
      if (passwordRef.current.value !== el.value) {
        setShowErrorConfirm(true);
        el.classList.remove("success");
        el.classList.add("error");
      } else {
        setShowErrorConfirm(false);
        el.classList.remove("error");
        el.classList.add("success");
      }
    }
  };

  const handleSignUp = async () => {
    if(userRef.current.value.length === 0) {
      setNameError(true);
      setMessage('Field is required');
      return;
    }

    if(passwordRef.current.value.length === 0) {
      setShowError(true);
      return;
    }

    if(passwordConfirmRef.current.value.length === 0) {
      setShowErrorConfirm(true);
      return;
    }

    if (
      userRef.current.value.length > 0 &&
      passwordRef.current.value.length > 0 &&
      passwordConfirmRef.current.value.length > 0
    ) {
      setLoading(true);
      await httpRequest.post("/user/add", {
        name: userRef.current.value,
        password: passwordRef.current.value.toLowerCase(),
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
            placeholder="Enter your user name..."
            ref={userRef}
            onChange={(e) => {
              setNameError(false);
              e.target.classList.remove("error");
              e.target.classList.remove("success");
            }}
            onBlur={(e) => handleCheckUserName(e)}
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
              type={`${showPassword ? "text" : "password"}`}
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
              onBlur={handleCheckPassword}
              placeholder="Enter your password..."
              ref={passwordRef}
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
              type={`${showPassword ? "text" : "password"}`}
              value={confirm}
              onChange={(e) => {
                passwordConfirmRef.current.classList.remove("success");
                passwordConfirmRef.current.classList.remove("error");
                setConfirm(e.target.value);

                if (showErrorConfirm) {
                  setConfirm("");
                }
                setShowErrorConfirm(false);
              }}
              onBlur={handleCheckConfirmPassword}
              ref={passwordConfirmRef}
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
