import { Animated } from "react-animated-css";
import { useSelector } from "react-redux";

import BookMarkList from "../../component/BookMarkItem";

import NavbarHeader from "../../component/Navbar/NavbarHeader/NavbarHeader";

import "./Bookmark.scss";

function BookmarkPage() {
  const { user, token } = useSelector((state) => state.data);
  return (
    <div className="h-cus p-x bookmark">
      <NavbarHeader />
      <Animated animationIn="fadeInUp" className="bookmark__header">
        <h1>Bookmark</h1>
      </Animated>
      {user?._id && user.liked.length > 0 && <BookMarkList data={user.liked} />}
      {token === null && (
        <Animated
          animationIn="fadeInUp"
          animationInDelay={600}
          className="bookmark__desc"
        >
          Ố ồ hình như bạn chưa đăng nhập🧐
        </Animated>
      )}
    </div>
  );
}

export default BookmarkPage;
