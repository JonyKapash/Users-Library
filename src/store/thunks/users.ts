import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../utils/types";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const data = await response.json();

    const users: User[] = data.results.map((user: any) => ({
      name: user.name,
      email: user.email,
      picture: user.picture.medium,
      location: {
        country: user.location.country,
        city: user.location.city,
        street: user.location.street,
      },
      id: user.login.uuid,
    }));

    return users;
  } catch (error) {
    console.error("Failed to fetch users: ", error);
    throw error;
  }
});
