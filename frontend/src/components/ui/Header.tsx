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
  ProfileDropdownMenuContentComponent,
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
                <ProfileDropdownMenuContentComponent />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
      </Container>
      <Separator className="bg-dark-theme dark:bg-light-theme" />
    </div>
  );
}

export default Header;
