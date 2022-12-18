import {
  GET_USER,
  GET_ALL_HOTEL,
  GET_POPULAR_HOTEL,
  GET_RECOMEND_HOTEL,
  GET_A_HOTEL,
  SEARCH_HOTEL,
  SEARCH__START_LOADING,
  SEARCH__FALSE_LOADING,
  DARK_MODE,
  MODAL_ANNOUNCE,
  MODAL_SETTING,
  TOKEN,
} from "./type";

const initialState = {
  user: {},
  allHotel: [],
  aHotel: {},
  searchHotel: [],
  token: null,
  loadingSearch: false,
  darkMode: false,
  modalAnnounce: false,
  modalSetting: {
    isOpen: false,
    type: ""
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case GET_ALL_HOTEL: {
      return {
        ...state,
        allHotel: [...action.payload],
      };
    }
    case GET_POPULAR_HOTEL: {
      return {
        ...state,
        allHotel: [...action.payload],
      };
    }
    case GET_RECOMEND_HOTEL: {
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

    case DARK_MODE: {
      return {
        ...state,
        darkMode: action.payload,
      };
    }

    case MODAL_ANNOUNCE: {
      return {
        ...state,
        modalAnnounce: action.payload,
      };
    }

    case MODAL_SETTING: {
      return {
        ...state,
        modalSetting: action.payload,
      };
    }

    case TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
