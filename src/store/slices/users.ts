import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/users";
import { UsersStore } from "../../utils/types";

const initialState: UsersStore = {
  users: [],
  isGetUsersInProgress: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isGetUsersInProgress = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isGetUsersInProgress = false;
        state.users = state.users.concat(action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isGetUsersInProgress = false;
        state.error = action.error.message;
      });
  },
});

export const { actions, reducer } = usersSlice;
