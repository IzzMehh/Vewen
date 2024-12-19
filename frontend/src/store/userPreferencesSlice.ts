import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme, UserPreference } from "@/typings/global";

const setUserPrefs = (): UserPreference => {
  const userPrefs = localStorage.getItem("userPrefs") || null;

  if (!userPrefs) {
    const isDarkMode: Theme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? Theme.dark
      : Theme.light;

    const defaultUserPrefs: UserPreference = {
      theme: Theme.system,
      sidebar: true,
    };
    document.documentElement.classList.add(`${isDarkMode}`);
    localStorage.setItem("userPrefs", JSON.stringify(defaultUserPrefs));

    return defaultUserPrefs;
  } else {
    const userPrefsJson: UserPreference = JSON.parse(userPrefs);

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

const initialState: UserPreference = setUserPrefs();

const UserPreferenceSlice = createSlice({
  name: "UserPreference",
  initialState,
  reducers: {
    updateUserPrefs: (state, action: PayloadAction<UserPreference>) => {
      state.sidebar = action.payload.sidebar;
      state.theme = action.payload.theme;

      const userPrefs: UserPreference = {
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

export const { updateUserPrefs } = UserPreferenceSlice.actions;
export default UserPreferenceSlice.reducer;
