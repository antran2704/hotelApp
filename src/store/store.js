import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = configureStore(
  {
    reducer: {
      data: reducer,
    },
  },
  composeWithDevTools()
);

export default store;
