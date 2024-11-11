import React from "react";
import {
  Header,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenuSeparator,
  Container,
  Button,
  ProfileDropdownMenuContentComponent,
} from "../index";

import { Link, NavLink } from "react-router-dom";

function SidebarComponent({
  profileImageUrl = "https://www.w3schools.com/howto/img_avatar.png",
}) {
  return (
    <Container>
      <Sidebar className="h-full" >
        <SidebarHeader />
        <SidebarContent className="relative mt-14">
          <SidebarMenuItem className="h-[50px] mb-2 px-2">
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
          </SidebarMenuItem>

          <SidebarMenuItem className="h-[50px] mb-2 px-2">
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
          </SidebarMenuItem>

          <SidebarMenuItem className="h-[50px] mb-2 px-2">
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
          </SidebarMenuItem>

          <SidebarMenuItem className="h-[50px] mb-2 px-2">
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
          </SidebarMenuItem>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="outline-none ml-auto md:m-0"
                  asChild
                >
                  <SidebarMenuButton className="h-[50px]">
                    <div className="flex cursor-pointer w-full">
                      <Avatar>
                        <AvatarImage src={profileImageUrl} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="w-full flex items-center pl-4">
                        IzzMehGaurav
                      </div>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <ProfileDropdownMenuContentComponent/>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </Container>
  );
}

export default SidebarComponent;
