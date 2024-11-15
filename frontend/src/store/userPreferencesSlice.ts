import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme, userPreference } from "@/typings/global";

const setUserPrefs = (): userPreference => {
  const userPrefs = localStorage.getItem("userPrefs") || null;

  if (!userPrefs) {
    const isDarkMode: Theme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? Theme.dark
      : Theme.light;

    const defaultUserPrefs: userPreference = {
      theme: Theme.system,
      sidebar: true,
    };
    document.documentElement.classList.add(`${isDarkMode}`);
    localStorage.setItem("userPrefs", JSON.stringify(defaultUserPrefs));

    return defaultUserPrefs;
  } else {
    const userPrefsJson: userPreference = JSON.parse(userPrefs);

    if (userPrefsJson.theme === "system") {
      const isDarkMode: Theme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? Theme.dark
        : Theme.light;
      document.documentElement.classList.add(`${isDarkMode}`);
    } else {
      document.documentElement.classList.add(`${userPrefsJson.theme}`);
    }
    return userPrefsJson;
  }
};

const initialState: userPreference = setUserPrefs();

const userPreferenceSlice = createSlice({
  name: "userPreference",
  initialState,
  reducers: {
    updateUserPrefs: (state, action: PayloadAction<userPreference>) => {
      state.sidebar = action.payload.sidebar;
      state.theme = action.payload.theme;
      console.log("HUHH");
      console.log(action);

      const userPrefs: userPreference = {
        sidebar: action.payload.sidebar,
        theme: action.payload.theme,
      };

      localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
      const systemTheme: Theme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? Theme.dark
        : Theme.light;
      document.documentElement.classList.value = `h-full ${
        action.payload.theme === "system" ? systemTheme : action.payload.theme
      }`;
    },
  },
});

export const { updateUserPrefs } = userPreferenceSlice.actions;
export default userPreferenceSlice.reducer;
