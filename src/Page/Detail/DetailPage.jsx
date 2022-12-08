import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { Animated } from "react-animated-css";

import "./DetailPage.scss";
import ButtonBack from "../../component/Button/ButtonBack";

function Detail() {
  const [isLiked, setLiked] = useState(false);
  const [urlImg, setUrl] = useState(
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  );

  const handleLiked = () => {
    setLiked(!isLiked);
  };

  const getUrlImg = (e) => {
    let timmer;
    clearTimeout(timmer);

    const el = e.target;
    el.style.transform = "scale(0.9)";
    const newUrl = el.src;

    timmer = setTimeout(() => {
      el.src = urlImg;
      setUrl(newUrl);
      el.style.transform = "scale(1)";
    }, 100);
  };
  return (
    <div className="p-x detail">
      <Animated animationIn="fadeInUp" className="detail__header">
        <ButtonBack />
        <img src={urlImg} alt="" className="header__img" />
        <ul className="header__list">
          <Animated animationIn="zoomIn" animationInDelay={1000}>
            <li className="header__item">
              <img
                src="https://images.unsplash.com/photo-1593006526979-5f8814c229f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt=""
                onClick={getUrlImg}
              />
            </li>
          </Animated>
          <Animated animationIn="zoomIn" animationInDelay={1200}>
            <li className="header__item">
              <img
                src="https://images.unsplash.com/photo-1559156160-866997559cc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt=""
                onClick={getUrlImg}
              />
            </li>
          </Animated>
          <Animated animationIn="zoomIn" animationInDelay={1400}>
            <li className="header__item">
              <img
                src="https://images.unsplash.com/photo-1572177215152-32f247303126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                alt=""
                onClick={getUrlImg}
              />
            </li>
          </Animated>
          <Animated animationIn="zoomIn" animationInDelay={1600}>
            <li className="header__item">
              <img
                src="https://images.unsplash.com/photo-1561501878-aabd62634533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt=""
                onClick={getUrlImg}
              />
            </li>
          </Animated>
        </ul>
      </Animated>

      <section className="detail__body">
        <Animated animationIn="fadeInUp" animationInDelay={1000}>
          <h1 className="detail__title">Aura house</h1>
        </Animated>
        <Animated animationIn="fadeInUp" animationInDelay={1200}>
          <h3 className="detail__subtitle">VietNam</h3>
        </Animated>
        <Animated
          animationIn="fadeInUp"
          className="detail__desc"
          animationInDelay={1400}
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
            quasi recusandae, iusto repellendus suscipit porro, eos sint
            inventore nesciunt, numquam sequi delectus quae nisi velit explicabo
            itaque voluptatibus mollitia odit? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Blanditiis quasi recusandae, iusto
            repellendus suscipit porro, eos sint inventore nesciunt, numquam
            sequi delectus quae nisi velit explicabo itaque voluptatibus
            mollitia odit? Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Blanditiis quasi recusandae, iusto repellendus suscipit porro,
            eos sint inventore nesciunt, numquam sequi delectus quae nisi velit
            explicabo itaque voluptatibus mollitia odit?
          </p>
        </Animated>
      </section>
      <footer className="detail__footer">
        <Animated animationIn="zoomIn" animationInDelay={1400}>
          <a href="tel:0941312903" className="footer__phone">
            <BsFillTelephoneFill className="phone__icon" />
          </a>
        </Animated>
        <Animated animationIn="zoomIn" animationInDelay={1400}>
          <div
            className={`footer__heart ${isLiked && "liked"}`}
            onClick={handleLiked}
          >
            {isLiked ? (
              <AiFillHeart className="heart__icon" />
            ) : (
              <AiOutlineHeart className="heart__icon" />
            )}
          </div>
        </Animated>
        <Animated
          animationIn="zoomIn"
          animationInDelay={1400}
          className="footer__btn"
        >
          <Link to="/map/test">
            <FaLocationArrow className="footer__icon" />
            Location
          </Link>
        </Animated>
      </footer>
    </div>
  );
}

export default Detail;
