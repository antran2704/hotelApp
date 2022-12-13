import { useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./HomeContent.scss";
import { handleLikeHotel, handleUnLikeHotel } from "../../store/actions";

function HomeItem({ data }) {
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
    if (data && user?._id) {
      const isLike = user.liked.find((item) => {
        return item._id === data._id ? true : false;
      });

      setLiked(isLike);
    }
  }, [data, user]);

  return (
    <div className="home__item">
      {!data ? (
        <SkeletonTheme baseColor="#e2e5e7" highlightColor="#f5f5f5">
          <Skeleton height={"100%"} />
        </SkeletonTheme>
      ) : (
        <Animated animationIn="zoomIn">
          <LazyLoadImage
            src={data.mainImage}
            alt={data.name}
            effect="blur"
            className="home__img"
          />
          <div className="home__content">
            <Link
              to={`/detail/${data.slug}`}
              className="home__content-link"
            ></Link>
            <Animated
              animationIn="zoomIn"
              animationInDelay={600}
              className={`home__content-header ${isLiked && "liked"}`}
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
              animationIn="fadeInDown"
              animationInDelay={600}
              className={"home__content-footer"}
            >
              <div className="home__content-infor">
                <h2 className="home__content-name">{data.name}</h2>
                <p className="home__content-location">{data.national}</p>
              </div>
              <div className="home__content-rate">
                <AiFillStar className="icon__star" />
                <span>{data.star}</span>
              </div>
            </Animated>
          </div>
        </Animated>
      )}
    </div>
  );
}

export default HomeItem;
