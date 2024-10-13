import React from "react";
import { Container } from "../index";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../index";

function Sidebar() {
  return (
    <Container>
      <div className="h-full relative">
        <div className="grid grid-rows-[repeat(70px)] gap-5">
          <div className="h-[50px]">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-black/90 text-light-theme dark:bg-white/90 dark:text-dark-theme h-full block rounded-xl"
                    : "h-full block"
                }`
              }
            >
              <Button className="w-full h-full rounded-xl hover:bg-black/90 hover:text-light-theme hover:dark:bg-white/90 hover:dark:text-dark-theme">
                <span className="relative top-[1px] mr-1">
                  <ion-icon name="home"></ion-icon>
                </span>
                Home
              </Button>
            </NavLink>
          </div>

          <div className="h-[50px]">
            <NavLink
              to={"/explore"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-black/90 text-light-theme dark:bg-white/90 dark:text-dark-theme h-full block rounded-xl"
                    : "h-full block"
                }`
              }
            >
              <Button className="w-full h-full rounded-xl hover:bg-black/90 hover:text-light-theme hover:dark:bg-white/90 hover:dark:text-dark-theme">
                <span className="relative top-[1px] mr-1">
                  <ion-icon name="search"></ion-icon>
                </span>
                Explore
              </Button>
            </NavLink>
          </div>

          <div className="h-[50px]">
            <NavLink
              to={"/notification"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-black/90 text-light-theme dark:bg-white/90 dark:text-dark-theme h-full block rounded-xl"
                    : "h-full block"
                }`
              }
            >
              <Button className="w-full h-full rounded-xl hover:bg-black/90 hover:text-light-theme hover:dark:bg-white/90 hover:dark:text-dark-theme">
                <span className="relative top-[1px] mr-1">
                  <ion-icon name="notifications"></ion-icon>
                </span>
                Notification
              </Button>
            </NavLink>
          </div>

          <div className="h-[50px]">
            <NavLink
              to={"/messages"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-black/90 text-light-theme dark:bg-white/90 dark:text-dark-theme h-full block rounded-xl"
                    : "h-full block"
                }`
              }
            >
              <Button className="w-full h-full rounded-xl hover:bg-black/90 hover:text-light-theme hover:dark:bg-white/90 hover:dark:text-dark-theme">
                <span className="relative top-[1px] mr-1">
                  <ion-icon name="mail"></ion-icon>
                </span>
                Messages
              </Button>
            </NavLink>
          </div>
        </div>

        <div className="h-[50px] absolute bottom-0 w-full">
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-black/90 text-light-theme dark:bg-white/90 dark:text-dark-theme h-full block rounded-xl"
                  : "h-full block"
              }`
            }
          >
            <Button className="w-full h-full rounded-xl hover:bg-black/90 hover:text-light-theme hover:dark:bg-white/90 hover:dark:text-dark-theme">
              <span className="relative top-[1px] mr-1">
                <ion-icon name="person"></ion-icon>
              </span>
              Profile
            </Button>
          </NavLink>
        </div>
      </div>
    </Container>
  );
}

export default Sidebar;
