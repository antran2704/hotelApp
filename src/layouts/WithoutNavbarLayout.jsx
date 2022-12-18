import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./layout.scss";

import { getUser, handleModalAnnounce, getToken } from "../store/actions";
import Modal from "../component/Modal/ModalLogin";

function WithoutNavbarLayout({ children }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.data);

  const location = useLocation();

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("token"));
    getToken(dispatch, value);
  }, [dispatch]);

  useEffect(() => {
    handleModalAnnounce(dispatch, false);
    getUser(dispatch, token);
  }, [dispatch, location.pathname, token]);
  return (
    <main className="container">
      <div className="content">
        <div className="default">
          {children}
          <Modal />
        </div>
      </div>
    </main>
  );
}

export default WithoutNavbarLayout;
