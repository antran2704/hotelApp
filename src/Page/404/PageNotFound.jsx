import { Link } from "react-router-dom";
import "./PageNotFound.scss";

function PageNotFound() {
  return (
    <div className="notfound">
      <div className="notfound__image">
        <img
          src="https://global-uploads.webflow.com/5f98b7826beb07a4f4d84b2f/60d24a314bcba99e3d710998_Illustration_404-p-500.png"
          alt=""
        />
      </div>
      <div className="notfound__content">
        <h2 className="notfound__title">Oops, Something's Not Right.</h2>
        <p className="notfound__desc">
          Please check the URL again or let us take you back to the blog
          homepage.
        </p>
        <Link to={"/"} className="notfound__btn">Back to Home page</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
