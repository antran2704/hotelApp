import { Animated } from "react-animated-css";
import BookMarkList from "../../component/BookMarkItem";

import NavbarHeader from "../../component/Navbar/NavbarHeader/NavbarHeader";

import "./Bookmark.scss";

function BookmarkPage() {
  return (
    <div className="h-cus p-x bookmark">
      <NavbarHeader />
      <Animated animationIn="fadeInUp" className="bookmark__header">
        <h1>Bookmark</h1>
      </Animated>

      <BookMarkList />
    </div>
  );
}

export default BookmarkPage;
