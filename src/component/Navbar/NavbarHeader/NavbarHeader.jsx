import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Animated } from "react-animated-css";

import "./NavbarHeader.scss";

function NavbarHeader() {
  const { user } = useSelector((state) => state.data);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user?._id) {
      setUserName(user.name);
    }
  }, [user]);
  return (
    <nav className="navbar__header">
      <div className="navbar__left">
        <Animated
          animationIn="zoomIn"
          animationInDelay={600}
          className="navbar__user"
        >
          {userName.length > 0 && `Hello, ${userName}😊`}
        </Animated>
      </div>
      <div className="navbar__right">
        <AiOutlineBell className="navbar__icon" />
      </div>
    </nav>
  );
}

export default NavbarHeader;
