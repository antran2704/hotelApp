import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import "react-loading-skeleton/dist/skeleton.css";
// mapbox css
import 'mapbox-gl/dist/mapbox-gl.css';

import routes from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import WithoutNavbarLayout from "./layouts/WithoutNavbarLayout";
import { DARK_MODE } from "./store/type";

function App() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.data)
  const localDarkmode = JSON.parse(localStorage.getItem("darkmode"));

  useEffect(() => {
    dispatch({
      type: DARK_MODE,
      payload: localDarkmode
    })
  },[dispatch, localDarkmode])
  return (
    <div className={`App ${darkMode && 'dark'}`}>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Layout = route.layout !== null ? DefaultLayout : WithoutNavbarLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <route.component />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
