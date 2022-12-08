import BookmarkPage from "../Page/Bookmark/BookmarkPage";
import DetailPage from "../Page/Detail/DetailPage";
import HomePage from "../Page/Home/HomePage";
import MapPage from "../Page/Map/MapPage";
import PopularPage from "../Page/Popular/PopularPage";
import RecommendPage from "../Page/Recommend/RecommendPage";
import SearchPage from "../Page/Search/SearchPage";

const routes = [
  {
    path: "/",
    component: HomePage,
    layout: "default"
  },
  {
    path: "/popular",
    component: PopularPage,
    layout: "default"
  },
  {
    path: "/recommend",
    component: RecommendPage,
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
];

export default routes;