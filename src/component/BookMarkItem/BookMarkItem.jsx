import { useState } from "react";
import { Animated } from "react-animated-css";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./BookMarkItem.scss";
function BookMarkItem() {
  const [isLiked, setLiked] = useState(false);

  const handleLiked = (e) => {
    setLiked(!isLiked);
  };
  return (
    <>
      <Animated animationIn="fadeInUp" className="bookmark__item">
        <Link to="/detail/khach-san-vung-tau" className="bookmark__link">
          <img
            className="bookmark__img"
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </Link>
        <div className="bookmark__infor">
          <div className="infor__header">
            <p className="infor__name">Aura house</p>
            <p className="infor__national">VietNam</p>
          </div>
          <div className="infor__body">
            <Animated
              animationIn="zoomIn"
              animationInDelay={600}
              className={`body__heart ${isLiked && "liked"}`}
            >
              <div onClick={handleLiked}>
                {isLiked ? (
                  <AiFillHeart className="icon__heart" />
                ) : (
                  <AiOutlineHeart className="icon__heart" />
                )}
              </div>
            </Animated>
            <Animated
              animationIn="zoomIn"
              animationInDelay={600}
              className="body__star"
            >
              <AiFillStar className="icon__star" />
              <span>4.9</span>
            </Animated>
          </div>
        </div>
      </Animated>
    </>
  );
}

export default BookMarkItem;
