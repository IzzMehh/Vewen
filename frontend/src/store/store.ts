import { configureStore } from "@reduxjs/toolkit"
import userPreferencesSlice from "./userPreferencesSlice"
import userDataSlice from "./authSlice"

const store = configureStore({
  reducer: {
    userPref: userPreferencesSlice,
    userData: userDataSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store