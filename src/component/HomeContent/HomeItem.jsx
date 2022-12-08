import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./HomeContent.scss";

function HomeItem() {
  const [isLiked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLiked = (e) => {
    setLiked(!isLiked);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    },1000)
  },[])

  return (
    <div className="home__item">
      {loading ? (
        <Skeleton height={"100%"}/>
      ) : (
        <Animated animationIn="zoomIn">
          <img
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="item"
            className="home__img"
          />
          <div className="home__content">
            <Link
              to="/detail/khach-san-vung-tau"
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
                <h2 className="home__content-name">Aura house</h2>
                <p className="home__content-location">VietNam</p>
              </div>
              <div className="home__content-rate">
                <AiFillStar className="icon__star" />
                <span>4.9</span>
              </div>
            </Animated>
          </div>
        </Animated>
      )}
    </div>
  );
}

export default HomeItem;
