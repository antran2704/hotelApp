import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import {
  getAllHotel,
  getPopularHotel,
  getRecomendHotel,
} from "../../store/actions";

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

function HomeContent({ category }) {
  const dispatch = useDispatch();
  const { allHotel, contentLoading } = useSelector((state) => state.data);
  
  useEffect(() => {
    if (category === "popular") {
      getPopularHotel(dispatch);
    }
    if (category === "recomend") {
      getRecomendHotel(dispatch);
    } else {
      getAllHotel(dispatch);
    }
  }, [category, dispatch]);

  return (
    <div className="home__list">
      <Slider {...settings}>
        {allHotel.length > 0 && !contentLoading ? (
          allHotel.map((item) => <HomeItem key={item._id} data={item} />)
        ) : (
          <>
            <HomeItem />
          </>
        )}
      </Slider>
    </div>
  );
}

export default HomeContent;
