import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./layout.scss";

import { getUser } from "../store/actions";

function WithoutNavbarLayout({ children }) {
  const dispatch = useDispatch();

  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getUser(dispatch, token);
  }, [dispatch, location.pathname, token]);
  return (
    <main className="container">
      <div className="content">
        <div className="default">{children}</div>
      </div>
    </main>
  );
}

export default WithoutNavbarLayout;
