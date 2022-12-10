import httpRequest from "../ultils";
import {
  GET_ALL_HOTEL,
  GET_A_HOTEL,
  SEARCH_HOTEL,
  SEARCH__FALSE_LOADING,
} from "./type";

export const getAllHotel = async (dispatch) => {
  try {
    const data = await httpRequest.get("/hotel/all");
    dispatch({
      type: GET_ALL_HOTEL,
      payload: data.data,
    });
  } catch (error) {
    console.log(error, "false get all hotel");
  }
};

export const getAHotel = async (dispatch, slug) => {
  try {
    const data = await httpRequest.get(`/hotel/${slug}`);
    dispatch({
      type: GET_A_HOTEL,
      payload: data.data,
    });
  } catch (error) {
    console.log(error, "false get all hotel");
  }
};

export const handleSearchHotel = async (dispatch, slug) => {
  try {
    const data = await httpRequest.get(`/hotel/search?q=${slug}`);
    dispatch({
      type: SEARCH_HOTEL,
      payload: data.data,
    });
  } catch (error) {
    console.log(error, "false search hotel");
    dispatch({
      type: SEARCH__FALSE_LOADING,
      payload: false,
    });
  }
};
