import { useState } from "react";
import Slider from "react-slick";



import "./HomeContent.scss";
import HomeItem from "./HomeItem";

const settings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  variableWidth: true,
};

function HomeContent() {

  return (
    <div className="home__list">
      <Slider {...settings}>
        <HomeItem />
        <HomeItem />
        <HomeItem />
        <HomeItem />
        <HomeItem />
      </Slider>
    </div>
  );
}

export default HomeContent;
