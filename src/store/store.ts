import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices/users";

const store = configureStore({
  reducer: {
    users: reducer,
  },
});

export default store;
