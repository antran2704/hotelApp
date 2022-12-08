import "./NavbarFooter.scss";
import items from "./index.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function NavbarFooter() {
  const [active, setActive] = useState("home");
  const dotRef = useRef(null);
  const firstElRef = useRef(null);

  const handleChangePositon = (e, name) => {
    const item = e.closest(".navbar__item");
    const left = item.offsetLeft;
    dotRef.current.style.left = left + 8 + "px";
    dotRef.current.style.animation = "animate linear 0.8s forwards";
    setTimeout(() => {
      setActive(name);
      dotRef.current.style.animation = "";
    }, 600);
  };

  useEffect(() => {
    const left = firstElRef.current.offsetLeft;
    dotRef.current.style.left = left + 8 + "px";
  }, []);

  return (
    <ul className="navbar__footer">
      <div className="dot" ref={dotRef}></div>
      {items.map((item, index) => (
        <li
          className={`navbar__item ${active === item.name && "active"}`}
          key={index}
          ref={index === 0 ? firstElRef : null}
          onClick={(e) => {
            handleChangePositon(e.target, item.name);
          }}
        >
          <Link to={item.path}>
            <item.icon className="navbar__icon" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavbarFooter;
