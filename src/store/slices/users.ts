import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/users";
import { User, UsersStore } from "../../utils/types";

const initialState: UsersStore = {
  users: [],
  isGetUsersInProgress: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { id, field, value } = action.payload;
      return {
        ...state,
        users: state.users.map((user: User) =>
          user.id === id ? { ...user, [field]: value } : user
        ),
      };
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user: User) => user.id !== id);
    },
  },
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

export const { updateUser, addUser, deleteUser } = usersSlice.actions;

export const { actions, reducer } = usersSlice;
