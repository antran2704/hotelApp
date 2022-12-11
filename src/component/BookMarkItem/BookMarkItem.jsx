import { useEffect } from "react";
import { useState } from "react";
import { Animated } from "react-animated-css";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./BookMarkItem.scss";
import { handleLikeHotel, handleUnLikeHotel } from "../../store/actions";

function BookMarkItem({ data }) {
  const { user } = useSelector((state) => state.data);

  const [isLiked, setLiked] = useState(false);

  const handleLiked = () => {
    if (!isLiked) {
      setLiked(true);
      handleLikeHotel({
        userId: user._id,
        hotelId: data._id,
      });
    } else {
      setLiked(false);
      handleUnLikeHotel({
        userId: user._id,
        hotelId: data._id,
      });
    }
  };

  useEffect(() => {
    if (user?._id) {
      const isLike = user.liked.find((item) => {
        return item._id === data._id ? true : false;
      });

      setLiked(isLike);
    }
  }, [data, user]);
  return (
    <>
      <Animated animationIn="fadeInUp" className="bookmark__item">
        <Link to={`/detail/${data.slug}`} className="bookmark__link">
          <img className="bookmark__img" src={data.mainImage} alt="" />
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
