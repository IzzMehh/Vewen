import { Link } from "react-router-dom";
import {
  Container,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  Button,
} from "../index";

import { Theme } from "@/typings/global.ts";

import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { updateUserPrefs } from "@/store/userPreferencesSlice";
import auth from "@/backend/Auth";

function ProfileDropdownMenuContentComponent() {
  const userPrefs = useAppSelector((state) => state.userPref);
  const dispatch = useAppDispatch();

  const theme =
    userPrefs.theme === Theme.system
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? Theme.dark
        : Theme.light
      : userPrefs.theme;

  const changeTheme = (theme: Theme) => {
    dispatch(updateUserPrefs({ theme, sidebar: userPrefs.sidebar }));
  };

  return (
    <DropdownMenuContent className="dark:bg-dark-theme bg-light-theme w-[--radix-popper-anchor-width]">
      <Link to={"/profile"}>
        <DropdownMenuLabel className="dark:text-dark-theme-text default-hover cursor-pointer">
          My Account{" "}
          <span className="relative top-[4px] text-lg">
            <ion-icon name="person-circle-outline"></ion-icon>
          </span>
        </DropdownMenuLabel>
      </Link>
      <DropdownMenuSeparator className="dark:bg-light-theme bg-dark-theme" />

      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-start">
          <DropdownMenuLabel className=" dark:text-dark-theme-text text-[13px] default-hover cursor-pointer w-full">
            {userPrefs.theme.charAt(0).toUpperCase() + userPrefs.theme.slice(1)}{" "}
            Theme {""}
            <span className="relative top-[2px]">
              <ion-icon name={`${theme === "dark" ? "moon" : "sunny"}`}></ion-icon>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="dark:bg-dark-theme bg-light-theme"
          side="left"
        >
          <DropdownMenuLabel
            className={` dark:text-dark-theme-text default-hover cursor-pointer ${
              userPrefs.theme + " Theme" === "Dark Theme"
                ? "border border-white"
                : null
            }`}
            onClick={() => changeTheme(Theme.dark)}
          >
            Dark Theme{" "}
            <span className="relative top-[2px]">
              <ion-icon name="moon"></ion-icon>
            </span>
          </DropdownMenuLabel>
          <DropdownMenuLabel
            className={` dark:text-dark-theme-text default-hover cursor-pointer ${
              userPrefs.theme + " Theme" === "Light Theme"
                ? "border border-white"
                : null
            }`}
            onClick={() => changeTheme(Theme.light)}
          >
            Light Theme{" "}
            <span className="relative top-[2px]">
              <ion-icon name="sunny"></ion-icon>
            </span>
          </DropdownMenuLabel>
          <DropdownMenuLabel
            className={` dark:text-dark-theme-text default-hover cursor-pointer ${
              userPrefs.theme + " Theme" === "System Theme"
                ? "border border-white"
                : null
            }`}
            onClick={() => changeTheme(Theme.system)}
          >
            System Theme{" "}
            <span className="relative top-[2px]">
              <ion-icon name="settings"></ion-icon>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenuLabel  
      onClick={async()=>auth.logout()}
       className="hover:bg-red-800 hover:text-dark-theme-text hover:dark:bg-red-600 text-red-600  cursor-pointer">
        Logout{" "}
        <span className="relative top-[2px]">
          <ion-icon name="log-out-outline"></ion-icon>
        </span>
      </DropdownMenuLabel>
    </DropdownMenuContent>
  );
}

export default ProfileDropdownMenuContentComponent;
