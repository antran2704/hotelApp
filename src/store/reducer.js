import {
  GET_ALL_HOTEL,
  GET_A_HOTEL,
  SEARCH_HOTEL,
  SEARCH__START_LOADING,
  SEARCH__FALSE_LOADING,
} from "./type";

const initialState = {
  allHotel: [],
  aHotel: {},
  searchHotel: [],
  loadingSearch: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_HOTEL: {
      return {
        ...state,
        allHotel: [...action.payload],
      };
    }
    case GET_A_HOTEL: {
      return {
        ...state,
        aHotel: action.payload,
      };
    }

    case SEARCH_HOTEL: {
      return {
        ...state,
        searchHotel: action.payload,
        loadingSearch: false,
      };
    }
    case SEARCH__START_LOADING: {
      return {
        ...state,
        loadingSearch: true,
      };
    }
    case SEARCH__FALSE_LOADING: {
      return {
        ...state,
        loadingSearch: false,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
