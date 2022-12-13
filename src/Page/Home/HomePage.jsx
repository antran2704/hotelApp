import { Animated } from "react-animated-css";
import { useState } from "react";

import NavbarHeader from "../../component/Navbar/NavbarHeader/NavbarHeader";
import HomeContent from "../../component/HomeContent";
import listCategory from "./index";

import "./HomePage.scss";

function HomePage() {
  const [category, setCategory] = useState("all");

  const handleCategory = (value) => {
    setCategory(value);
  };
  return (
    <section className="p-x h-cus home">
      <NavbarHeader />

      <div className="home__header">
        <Animated animationIn="fadeInUp">
          <h3 className="header__subtitle">Explore this</h3>
        </Animated>
        <Animated animationIn="fadeInUp">
          <h1 className="header__title">Fantastic Earth</h1>
        </Animated>
      </div>

      <div className="home__category">
        <ul className="category__list">
          {listCategory.map((item, index) => (
            <Animated animationIn="fadeInRight" isVisible={true} key={index}>
              <li
                className={`category__item ${category === item.value && "active"}`}>
                <p onClick={() => handleCategory(item.value)}>{item.title}</p>
              </li>
            </Animated>
          ))}
        </ul>
      </div>

      <HomeContent category={category} />
    </section>
  );
}

export default HomePage;
