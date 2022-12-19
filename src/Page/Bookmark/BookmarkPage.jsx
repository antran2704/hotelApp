import { Animated } from "react-animated-css";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import BookMarkList from "../../component/BookMarkItem";

import NavbarHeader from "../../component/Navbar/NavbarHeader/NavbarHeader";

import "./Bookmark.scss";

function BookmarkPage() {
  const { user, token, contentLoading } = useSelector((state) => state.data);
  return (
    <div className="h-cus p-x bookmark">
      <NavbarHeader />
      <Animated animationIn="fadeInUp" className="bookmark__header">
        <h1>Bookmark</h1>
      </Animated>

      {!contentLoading && user?._id && user.liked.length > 0 && (
        <BookMarkList data={user.liked} />
      )}

      {!contentLoading && user?._id && user.liked.length === 0 && (
        <Animated
          animationIn="fadeInUp"
          animationInDelay={600}
          className="bookmark__desc"
        >
          Bạn chưa thích khách sạn nào cả🧐
        </Animated>
      )}

      {token === null && (
        <Animated
          animationIn="fadeInUp"
          animationInDelay={600}
          className="bookmark__desc"
        >
          Ố ồ hình như bạn chưa đăng nhập🧐
        </Animated>
      )}

      {contentLoading && (
        <div className="bookmark__loading">
          <AiOutlineLoading3Quarters className="bookmark__loading-icon" />
        </div>
      )}
    </div>
  );
}

export default BookmarkPage;
