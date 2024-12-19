import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

import { useAppSelector } from "@/hooks/store";

interface User {
  profileImageUrl?: string;
  display_name?: string;
}

function Header({
  profileImageUrl = "https://www.w3schools.com/howto/img_avatar.png",
  display_name = "IzzMehGauravv",
}: User) {
  const userData = useAppSelector((state) => state?.userData);
  const navigate = useNavigate();
  
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
              {userData?.display_name || (
                <Button
                  className="w-full bg-dark-theme text-light-theme hover:bg-black dark:bg-light-theme dark:text-dark-theme rounded "
                  type="submit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </div>
            {userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none ml-auto md:m-0  ">
                  <Avatar>
                    <AvatarImage
                      src={userData.profileImage.url || profileImageUrl}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <ProfileDropdownMenuContentComponent />
                </DropdownMenuTrigger>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
