import BookmarkPage from "../Page/Bookmark/BookmarkPage";
import DetailPage from "../Page/Detail/DetailPage";
import HomePage from "../Page/Home/HomePage";
import MapPage from "../Page/Map/MapPage";
import SearchPage from "../Page/Search/SearchPage";
import SettingPage from "../Page/Setting/SettingPage";
import LoginPage from "../Page/Form/LoginPage";
import SignUpPage from "../Page/Form/SignUpPage";

const routes = [
  {
    path: "/",
    component: HomePage,
    layout: "default"
  },
  {
    path: "/detail/:name",
    component: DetailPage,
    layout: null
  },
  {
    path: "/bookmark",
    component: BookmarkPage,
    layout: "default"
  },
  {
    path: "/location",
    component: MapPage,
    layout: "default"
  },
  {
    path: "/map/:name",
    component: MapPage,
    layout: null
  },
  {
    path: "/search",
    component: SearchPage,
    layout: "default"
  },
  {
    path: "/user",
    component: SettingPage,
    layout: "default"
  },
  {
    path: "/login",
    component: LoginPage,
    layout: null
  },
  {
    path: "/signup",
    component: SignUpPage,
    layout: null
  },
];

export default routes;
