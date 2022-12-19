import httpRequest from "../ultils";
import {
  GET_USER,
  GET_ALL_HOTEL,
  GET_POPULAR_HOTEL,
  GET_RECOMEND_HOTEL,
  GET_A_HOTEL,
  SEARCH_HOTEL,
  SEARCH__FALSE_LOADING,
  CONTENT__START_LOADING,
  CONTENT__FALSE_LOADING,
  MODAL_ANNOUNCE,
  MODAL_SETTING,
  TOKEN,
} from "./type";

// User Action
export const getUser = async (dispatch, token) => {
  dispatch({
    type: CONTENT__START_LOADING,
  });

  try {
    const user = await httpRequest.get(`/user/getUser/${token}`);
    dispatch({
      type: GET_USER,
      payload: user.data,
    });

    dispatch({
      type: CONTENT__FALSE_LOADING,
    });
  } catch (error) {
    console.log(error, "false get user");
  }
};

export const handleLikeHotel = async (data) => {
  try {
    await httpRequest.post(`/user/like`, data);
  } catch (error) {
    console.log(error, "false like hotel");
  }
};

export const handleUnLikeHotel = async (data) => {
  try {
    await httpRequest.post(`/user/unlike`, data);
  } catch (error) {
    console.log(error, "false unlike hotel");
  }
};
// Hotel Action
export const getAllHotel = async (dispatch) => {
  dispatch({
    type: CONTENT__START_LOADING,
  });

  try {
    const data = await httpRequest.get("/hotel/all");
    dispatch({
      type: GET_ALL_HOTEL,
      payload: data.data,
    });

    dispatch({
      type: CONTENT__FALSE_LOADING,
    });
  } catch (error) {
    console.log(error, "false get all hotel");
  }
};

export const getPopularHotel = async (dispatch) => {
  dispatch({
    type: CONTENT__START_LOADING,
  });

  try {
    const data = await httpRequest.get("/hotel/popular");
    console.log(data.data);
    dispatch({
      type: GET_POPULAR_HOTEL,
      payload: data.data,
    });

    dispatch({
      type: CONTENT__FALSE_LOADING,
    });
  } catch (error) {
    console.log(error, "false get popular hotel");
  }
};

export const getRecomendHotel = async (dispatch) => {
  dispatch({
    type: CONTENT__START_LOADING,
  });

  try {
    const data = await httpRequest.get("/hotel/recomend");
    dispatch({
      type: GET_RECOMEND_HOTEL,
      payload: data.data,
    });

    dispatch({
      type: CONTENT__FALSE_LOADING,
    });
  } catch (error) {
    console.log(error, "false get popular hotel");
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

export const handleSearchHotel = async (dispatch, slug, city) => {
  try {
    if (city) {
      const data = await httpRequest.get(
        `/hotel/search?q=${slug}&city=${city}`
      );
      dispatch({
        type: SEARCH_HOTEL,
        payload: data.data,
      });
    } else {
      const data = await httpRequest.get(`/hotel/search?q=${slug}`);
      dispatch({
        type: SEARCH_HOTEL,
        payload: data.data,
      });
    }
  } catch (error) {
    console.log(error, "false search hotel");
    dispatch({
      type: SEARCH__FALSE_LOADING,
      payload: false,
    });
  }
};

//modal
export const handleModalAnnounce = (dispatch, value) => {
  dispatch({
    type: MODAL_ANNOUNCE,
    payload: value,
  });
};

export const handleModalSetting = (dispatch, value) => {
  dispatch({
    type: MODAL_SETTING,
    payload: value,
  });
};

// localStorage
export const getToken = (dispatch, token) => {
  dispatch({
    type: TOKEN,
    payload: token,
  });
};
