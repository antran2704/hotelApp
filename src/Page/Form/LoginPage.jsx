import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

import "./Form.scss";
import { Animated } from "react-animated-css";
import { checkUser } from "../../helper";

function LoginPage() {
  const navigate = useNavigate();

  const inital = {
    userName: "",
    password: ""
  }

  const [formValues, setFormValues] = useState(inital);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (element) => {
    const {value, name} = element;

    setShowError(false);
    setFormValues({...formValues, [name]: value})
  };

  const handleLogin = async () => {
    setLoading(true);

    const name = formValues.userName;
    const password = formValues.password;

    const token = await checkUser(name, password);

    // catch if error on server
    if (token === "error on server") {
      alert("error on server");
      setLoading(false);
      return;
    }

    if (token === "user not exit") {
      localStorage.setItem("token", JSON.stringify(token));
      setLoading(false);
      setFormValues({...formValues, password: ""});
      setShowError(true);
    } else {
      localStorage.setItem("token", JSON.stringify(token));
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="h-cus p-x login">
      <Animated animationIn="zoomIn">
        <h1 className="login__title">Wellcome back 😊</h1>
        <p className="login__desc">Please enter your account!!!</p>
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
            name="userName"
            value={formValues.userName}
            type="text"
            placeholder="Enter your user name..."
            onChange={(e) => handleInput(e.target)}
          />
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
        </Animated>
        {showError && <p className="login__error">Wrong user or password🥲</p>}
      </div>
      <Animated
        animationIn="zoomIn"
        animationInDelay={1600}
        animationInDuration={1200}
      >
        <button className="login__btn" onClick={handleLogin}>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="login__btn-loading" />
          ) : (
            "Sign in"
          )}
        </button>

        <p className="login__redirect">
          Don't have an account🤔?
          <Link to={"/signup"} className="login__redirec-link">
            Sign up
          </Link>
        </p>
      </Animated>
    </div>
  );
}

export default LoginPage;
