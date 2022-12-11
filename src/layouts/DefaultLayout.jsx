import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavbarFooter from "../component/Navbar/NavbarFooter/NavbarFooter";
import "./layout.scss";

import { getUser } from "../store/actions";

function DefaultLayout({ children }) {
  const dispatch = useDispatch();

  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getUser(dispatch, token);
  }, [dispatch, location.pathname, token]);
  return (
    <main className="container">
      <div className="content">
        <section className="default">
          {children}
          <NavbarFooter />
        </section>
      </div>
    </main>
  );
}

export default DefaultLayout;
