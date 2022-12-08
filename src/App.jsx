import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import WithoutNavbarLayout from "./layouts/WithoutNavbarLayout";

function App() {
  return (
    <div className="App">
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
