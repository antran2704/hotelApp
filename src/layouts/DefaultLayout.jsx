import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavbarFooter from "../component/Navbar/NavbarFooter/NavbarFooter";
import "./layout.scss";

import { getUser, handleModalAnnounce, getToken} from "../store/actions";
import Modal from "../component/Modal/Modal";

function DefaultLayout({ children }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.data);

  const location = useLocation();

  useEffect(() => {
  const value = JSON.parse(localStorage.getItem("token"));
    getToken(dispatch,value)
  },[dispatch])

  useEffect(() => {
    handleModalAnnounce(dispatch, false)
    getUser(dispatch, token);
  }, [dispatch, location.pathname, token]);
  return (
    <main className="container">
      <div className="content">
        <section className="default">
          {children}
          <NavbarFooter />
          <Modal />
        </section>
      </div>
    </main>
  );
}

export default DefaultLayout;
