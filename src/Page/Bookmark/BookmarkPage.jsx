import { Animated } from "react-animated-css";
import { useSelector } from "react-redux";

import BookMarkList from "../../component/BookMarkItem";

import NavbarHeader from "../../component/Navbar/NavbarHeader/NavbarHeader";

import "./Bookmark.scss";

function BookmarkPage() {
  const { user } = useSelector((state) => state.data)
  return (
    <div className="h-cus p-x bookmark">
      <NavbarHeader />
      <Animated animationIn="fadeInUp" className="bookmark__header">
        <h1>Bookmark</h1>
      </Animated>
      {user?._id && user.liked.length > 0 && <BookMarkList data={user.liked}/>}
    </div>
  );
}

export default BookmarkPage;
