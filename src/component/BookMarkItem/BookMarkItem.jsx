import { useState } from "react";
import { Animated } from "react-animated-css";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./BookMarkItem.scss";
function BookMarkItem({data}) {
  const [isLiked, setLiked] = useState(false);

  const handleLiked = (e) => {
    setLiked(!isLiked);
  };
  return (
    <>
      <Animated animationIn="fadeInUp" className="bookmark__item">
        <Link to={`/detail/${data.slug}`} className="bookmark__link">
          <img
            className="bookmark__img"
            src= {data.mainImage}
            alt=""
          />
        </Link>
        <div className="bookmark__infor">
          <div className="infor__header">
            <p className="infor__name">{data.name}</p>
            <p className="infor__national">{data.national}</p>
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
              <span>{data.star}</span>
            </Animated>
          </div>
        </div>
      </Animated>
    </>
  );
}

export default BookMarkItem;
