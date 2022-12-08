import BookMarkList from "../../component/BookMarkItem";
import ButtonBack from "../../component/Button/ButtonBack";
import { useState } from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

import "./Search.scss";
function SearchPage() {
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  let timmer;

  const test = (e) => {
    console.log(e.target.value);
  };

  const change = (e) => {
    clearTimeout(timmer);
    setLoading(true);
    setSearchValue(e.target.value)

    timmer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  };


  return (
    <div className="h-cus p-x search">
      <div className="search__header">
        <ButtonBack />
        <h1 className="header__title">Search</h1>
      </div>
      <div className="search__select">
        <div className="select__header">
          <div className="select__btn">
            <FaSearch className="select__icon" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="select__input"
            value={searchValue}
            onChange={change}
          />
          <div className="search__clear" onClick={() => setSearchValue("")}>
            <AiFillCloseCircle className="clear__icon" />
          </div>
        </div>
        <div className="select__option-wrap">
          <div className="select__option-item">
            <select name="city" className="select__option" onChange={test}>
              <option value="" className="option__item">
                Thành phố
              </option>
              <option value="sai gon" className="option__item">
                Sai Gon
              </option>
            </select>
          </div>
        </div>
      </div>

      {!isLoading ? (
        <BookMarkList />
      ) : (
        <div className="search__loading">
          <BiLoaderAlt className="search__loading-icon" />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
