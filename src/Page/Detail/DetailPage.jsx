import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlineWifi } from "react-icons/ai";
import { FaLocationArrow, FaUtensils, FaSwimmingPool } from "react-icons/fa";
import { GiElevator } from "react-icons/gi";
import { Animated } from "react-animated-css";

import {
  handleLikeHotel,
  handleUnLikeHotel,
  getAHotel,
} from "../../store/actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./DetailPage.scss";
import ButtonBack from "../../component/Button/ButtonBack";

function Detail() {
  const params = useParams();
  const dispatch = useDispatch();
  const { aHotel, user } = useSelector((state) => state.data);
  const [isLiked, setLiked] = useState(false);
  const [urlImg, setUrl] = useState("");

  const handleLiked = () => {
    if (!isLiked) {
      setLiked(true);
      handleLikeHotel({
        userId: user._id,
        hotelId: aHotel._id,
      });
    } else {
      setLiked(false);
      handleUnLikeHotel({
        userId: user._id,
        hotelId: aHotel._id,
      });
    }
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

  useEffect(() => {
    getAHotel(dispatch, params.name);

    if (aHotel._id) {
      setUrl(aHotel.mainImage);
    }
  }, [dispatch, params.name, aHotel._id, aHotel.mainImage]);

  useEffect(() => {
    if (user?._id) {
      const isLike = user.liked.find((item) => {
        return item._id === aHotel._id ? true : false;
      });

      setLiked(isLike);
    }
  }, [aHotel, user]);
  return (
    <div className="p-x detail">
      <Animated animationIn="fadeInUp" className="detail__header">
        <ButtonBack />
        <img src={urlImg} alt="" className="header__img" />
        <ul className="header__list">
          {aHotel?._id &&
            aHotel.listImage.map((url, index) => (
              <Animated
                key={index}
                animationIn="zoomIn"
                animationInDelay={1000 + index * 8}
              >
                <li className="header__item">
                  <img src={url} alt="" onClick={getUrlImg} />
                </li>
              </Animated>
            ))}
        </ul>
      </Animated>

      {aHotel._id && (
        <>
          <section className="detail__body">
            <Animated animationIn="fadeInUp" animationInDelay={1000}>
              <h1 className="detail__title">{aHotel.name}</h1>
            </Animated>
            <Animated animationIn="fadeInUp" animationInDelay={1200}>
              <h3 className="detail__subtitle">{aHotel.national}</h3>
            </Animated>
            <Animated
              animationIn="fadeInUp"
              className="detail__desc"
              animationInDelay={1400}
            >
              <p>{aHotel.description}</p>
              <p className="detail__service-title">Dịch vụ</p>
              <div className="detail__services">
                {aHotel.services.airCondition && (
                  <div className="services__item">
                    <FaUtensils className="services__icon" />
                    <p className="services__title">Máy lạnh</p>
                  </div>
                )}

                {aHotel.services.swimmingPool && (
                  <div className="services__item">
                    <FaSwimmingPool className="services__icon" />
                    <p className="services__title">Hồ bơi</p>
                  </div>
                )}

                {aHotel.services.restaurant && (
                  <div className="services__item">
                    <FaUtensils className="services__icon" />
                    <p className="services__title">Nhà hàng</p>
                  </div>
                )}

                {aHotel.services.wifi && (
                  <div className="services__item">
                    <AiOutlineWifi className="services__icon" />
                    <p className="services__title">Wifi</p>
                  </div>
                )}

                {aHotel.services.lift && (
                  <div className="services__item">
                    <GiElevator className="services__icon" />
                    <p className="services__title">Thang máy</p>
                  </div>
                )}
              </div>
            </Animated>
          </section>
          <footer className="detail__footer">
            <Animated animationIn="zoomIn" animationInDelay={1400}>
              <a href={`tel:${aHotel.phoneNumber}`} className="footer__phone">
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
              <Link to={`/map/${aHotel.slug}`}>
                <FaLocationArrow className="footer__icon" />
                Location
              </Link>
            </Animated>
          </footer>
        </>
      )}
    </div>
  );
}

export default Detail;
