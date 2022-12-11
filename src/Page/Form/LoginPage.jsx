import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

import "./Form.scss";
import httpRequest from "../../ultils";

function LoginPage() {
  const navigate = useNavigate();

  const userRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (value) => {
    setShowError(false);
    setPassword(value);
  };

  const handleLogin = async () => {
    setLoading(true);

    const data = {
      name: userRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const token = await httpRequest.post("/user/check", data);
      if (token.data === "user not exit") {
        localStorage.setItem("token", JSON.stringify(token.data));
        setLoading(false);
        setPassword("");
        setShowError(true);
      } else {
        localStorage.setItem("token", JSON.stringify(token.data));
        setLoading(false);
        navigate("/")
      }
    } catch (error) {
      console.log(error, "false check user");
      setLoading(false);
    }
  };

  return (
    <div className="h-cus p-x login">
      <h1 className="login__title">Wellcome back 😊</h1>
      <p className="login__desc">Please enter your account!!!</p>

      <div className="login__content">
        <div className="login__content-item">
          <span className="item__title">User name</span>
          <input
            className="login__inp"
            type="text"
            placeholder="Enter your user name..."
            ref={userRef}
          />
        </div>
        <div className="login__content-item">
          <span className="item__title">Password</span>
          <div className="login__inp-wrap">
            <input
              className="login__inp"
              type={`${showPassword ? "text" : "password"}`}
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
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
        </div>
        {showError && <p className="login__error">Wrong user or password🥲</p>}
      </div>
      <button className="login__btn" onClick={handleLogin}>
        {isLoading ? (
          <AiOutlineLoading3Quarters className="login__btn-loading" />
        ) : (
          "Sign in"
        )}
      </button>
    </div>
  );
}

export default LoginPage;
