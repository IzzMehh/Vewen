export enum Theme {
  dark = "dark",
  light = "light",
  system = "system",
}

export interface userPreference {
  theme: Theme;
  sidebar: boolean;
}