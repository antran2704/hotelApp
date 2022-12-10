/* eslint-disable react-hooks/exhaustive-deps */
import BookMarkList from "../../component/BookMarkItem";
import ButtonBack from "../../component/Button/ButtonBack";
import { handleSearchHotel } from "../../store/actions";
import { useEffect, useState } from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SEARCH__START_LOADING } from "../../store/type";

import "./Search.scss";
import { useLayoutEffect } from "react";
function SearchPage() {
  const navigate = useNavigate();
  const useQuery = () => new URLSearchParams(useLocation().search);

  console.log()

  const dispatch = useDispatch();
  const query = useQuery().get("q");
  const { searchHotel, loadingSearch } = useSelector((state) => state.data);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value
      .normalize("NFD")
      .toLowerCase()
      .replace(":", "")
      .replace(/ /g, "-")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");

    value.length > 0 ? navigate(`/search?q=${value}`) : navigate(`/search`);
    setSearchValue(e.target.value);
    dispatch({
      type: SEARCH__START_LOADING,
    });
  };

  const handleClearSearch = () => {
    setSearchValue("");
    navigate(`/search`);
    dispatch({
      type: SEARCH__START_LOADING,
    });
    // handleSearchHotel(dispatch, query);
  }

  const handleSelect = (e) => {
    const value = e.target.value;
    if(query) {
      navigate(`/search?q=${query}&city=${value}`);
    } else {
      navigate(`/search?city=${value}`);
    }
  }

  useEffect(() => {
    const timmer = setTimeout(() => {
      handleSearchHotel(dispatch, query);
    }, 1400);

    return () => {
      clearTimeout(timmer);
    };
  }, [dispatch, query]);

  useLayoutEffect(() => {
    dispatch({
      type: SEARCH__START_LOADING,
    });
    handleSearchHotel(dispatch, query);
  }, []);

  return (
    <div className="h-cus p-x search">
      <div className="search__header">
        <ButtonBack redirect={"/"} />
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
            onChange={handleSearch}
          />
          <div className="search__clear" onClick={handleClearSearch}>
            <AiFillCloseCircle className="clear__icon" />
          </div>
        </div>
        <div className="select__option-wrap">
          <div className="select__option-item">
            <select
              name="city"
              className="select__option"
              onChange={handleSelect}
            >
              <option value="" className="option__item">
                Thành phố
              </option>
              <option value="Vũng Tàu" className="option__item">
                Sai Gon
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* {searchHotel.length === 0  && <h1>Ô ồ hình như không tìm thấy kết quả</h1>} */}

      {searchHotel.length > 0 && !loadingSearch && <BookMarkList />}

      {loadingSearch && (
        <div className="search__loading">
          <BiLoaderAlt className="search__loading-icon" />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
