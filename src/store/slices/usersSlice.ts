import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    name: {
      first: string;
      last: string;
    };
    phone: string;
    email: string;
  }

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const  data  = await axios.get("https://randomuser.me/api/?results=7");
  
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.users = action.payload.results;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch users";
        state.loading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      });
  },
});

export default usersSlice.reducer;
