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
} from "../index";


interface User {
  profileImageUrl: string;
  display_name: string;
}

function Header({
  profileImageUrl = "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=&pid=ImgDetMain",
  display_name = "IzzMehGauravv",
}: User) {
  return (
    <Container>
      <div className="flex">
        <div className="text-4xl font-bold w-[80%] ">
          <Link to={"/"}>
            <div>VeWen</div>
          </Link>
        </div>

        <div className="w-[20%] flex justify-evenly items-center ">
          <div className="text-lg text-center ">{display_name}</div>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar>
                <AvatarImage src={profileImageUrl} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-dark-theme bg-light-theme">
              <Link to={"/profile"}>
                <DropdownMenuLabel className="hover:bg-dark-theme hover:dark:bg-light-theme dark:text-dark-theme-text hover:dark:text-light-theme-text hover:text-dark-theme-text cursor-pointer">
                  My Account{" "}
                  <span className="relative top-[4px] text-lg">
                    <ion-icon name="person-circle-outline"></ion-icon>
                  </span>
                </DropdownMenuLabel>
              </Link>
              <DropdownMenuSeparator className="dark:bg-light-theme bg-dark-theme" />

              <DropdownMenuLabel className="hover:bg-dark-theme hover:dark:bg-light-theme dark:text-dark-theme-text hover:dark:text-light-theme-text hover:text-dark-theme-text cursor-pointer">
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
  );
}

export default Header;
