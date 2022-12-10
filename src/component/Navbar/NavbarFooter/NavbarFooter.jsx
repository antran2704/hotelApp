import "./NavbarFooter.scss";
import items from "./index.js";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function NavbarFooter() {
  const dotRef = useRef(null);
  const firstElRef = useRef(null);

  const location = useLocation()

  const handleChangePositon = (e) => {
    const item = e.closest(".navbar__item");
    const left = item.offsetLeft;
    dotRef.current.style.left = left + 8 + "px";
    dotRef.current.style.animation = "animate linear 0.8s forwards";
    setTimeout(() => {
      dotRef.current.style.animation = "";
    }, 600);
  };

  useEffect(() => {
    const left = firstElRef.current.offsetLeft;
    dotRef.current.style.left = left + 8 + "px";
  },[location.pathname])

  return (
    <ul className="navbar__footer">
      <div className="dot" ref={dotRef}></div>
      {items.map((item, index) => (
        <li
          className={`navbar__item ${location.pathname === item.path && "active"}`}
          key={index}
          ref={location.pathname === item.path ? firstElRef : null}
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
