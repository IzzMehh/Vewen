import React from "react";
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


interface User {
  profileImageUrl?: string;
  display_name?: string;
}

function Header({
  profileImageUrl = "https://www.w3schools.com/howto/img_avatar.png",
  display_name = "IzzMehGauravv",
}: User) {
  return (
    <div>
      <Container className="p-3">
        <div className="flex">
          <div className="text-4xl font-bold md:w-[80%] w-[50%]">
            <Link to={"/"} className=" absolute z-10">
              <div>VeWen</div>
            </Link>
          </div>

          <div className="md:w-[20%] flex justify-evenly md:items-center w-full items-end  ">
            <div className="text-lg text-center hidden md:block ">
              {display_name}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none ml-auto md:m-0  ">
                <Avatar>
                  <AvatarImage src={profileImageUrl} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-dark-theme bg-light-theme">
                <Link to={"/profile"}>
                  <DropdownMenuLabel className="dark:text-dark-theme-text default-hover cursor-pointer">
                    My Account{" "}
                    <span className="relative top-[4px] text-lg">
                      <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                  </DropdownMenuLabel>
                </Link>
                <DropdownMenuSeparator className="dark:bg-light-theme bg-dark-theme" />

                <DropdownMenuLabel className=" dark:text-dark-theme-text default-hover cursor-pointer">
                  Dark Theme{" "}
                  <span className="relative top-[2px]">
                    <ion-icon name="moon"></ion-icon>
                  </span>
                </DropdownMenuLabel>

                <DropdownMenuLabel className="hover:bg-red-800 hover:text-dark-theme-text hover:dark:bg-red-600 text-red-600  cursor-pointer">
                  Logout{" "}
                  <span className="relative top-[2px]">
                    <ion-icon name="log-out-outline"></ion-icon>
                  </span>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
      <Separator className="bg-dark-theme dark:bg-light-theme" />
    </div>
  );
}

export default Header;
