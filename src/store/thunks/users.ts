import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../utils/types";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=5");
    const data = await response.json();

    const users: User[] = data.results.map((user: any) => ({
      title: user.name.title,
      first: user.name.first,
      last: user.name.last,
      email: user.email,
      picture: user.picture.medium,
      country: user.location.country,
      city: user.location.city,
      streetName: user.location.street.name,
      streetNumber: user.location.street.number,
      id: user.login.uuid,
    }));

    return users;
  } catch (error) {
    console.error("Failed to fetch users: ", error);
    throw error;
  }
});
