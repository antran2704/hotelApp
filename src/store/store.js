import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      data: rootReducer,
    },
  devTools: true
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
