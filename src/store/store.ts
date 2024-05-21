import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import usersSlice from "./slices/usersSlice";

const combinedReducers = combineReducers({
  users: usersSlice,
});

export const makeStore = () => configureStore({
  reducer: combinedReducers,
});

const store = makeStore();

export const wrapper = createWrapper(makeStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch;
