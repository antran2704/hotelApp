import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { useSelector } from "react-redux";

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
        <h3 className="navbar__user">
          {userName.length > 0 && `Hello, ${userName}😊`}
        </h3>
      </div>
      <div className="navbar__right">
        <AiOutlineBell className="navbar__icon" />
      </div>
    </nav>
  );
}

export default NavbarHeader;
