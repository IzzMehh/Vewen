import { configureStore } from "@reduxjs/toolkit"
import userPreferencesSlice from "./userPreferencesSlice"

const store = configureStore({
  reducer: {
    userPref: userPreferencesSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store