export enum Theme {
  dark = "dark",
  light = "light",
  system = "system",
}

export interface UserPreference {
  theme: Theme;
  sidebar: boolean;
}

export interface UserData {
  _id: string;
  googleId?: number;
  display_name: string;
  username: string;
  email: string;
  profileImage: {
    url: string;
    public_id: number | null;
  };
  bannerImage: string;
  verified: boolean;
  updatedAt: string;
  createdAt: string;
  lastLoggedIn:string;
}

export interface userCredentials {
  googleId?: number;
  email?: string;
  display_name?: string;
  verified?: boolean;
  password?: string;
  username?: string;
  profileImage?: { url: string; public_id: number | null };
}

export interface FormValues {
    username: string;
    emailOrUsername?:string
    email: string;
    password: string;
  }