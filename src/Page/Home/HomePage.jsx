import NavbarHeader from "../../component/Navbar/NavbarHeader/NavbarHeader";
import "./HomePage.scss";
import HomeContent from "../../component/HomeContent";
import { Animated } from "react-animated-css";

function HomePage() {

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
          <Animated animationIn="fadeInRight" isVisible={true}>
            <li className="category__item">
              <a href="/">New</a>
            </li>
          </Animated>
          <Animated animationIn="fadeInRight" isVisible={true}>
            <li className="category__item">
              <a href="/">Popular</a>
            </li>
          </Animated>
          <Animated animationIn="fadeInRight" isVisible={true}>
            <li className="category__item">
              <a href="/">Recommend</a>
            </li>
          </Animated>
        </ul>
      </div>

      <HomeContent />
    </section>
  );
}

export default HomePage;
