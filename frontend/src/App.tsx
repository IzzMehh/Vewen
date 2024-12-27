import React from "react";
import {
  SidebarComponent,
  Header,
  SidebarProvider,
  SidebarTrigger,
  Container,
  Toaster,
  VerifyAccountEmail,
} from "./components/index";
import { Outlet } from "react-router";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { updateUserPrefs } from "./store/userPreferencesSlice";
import { useToast } from "./hooks/use-toast";
import moment from "moment";

function App() {
  const sidebarToggleButton = useRef<HTMLButtonElement | null>(null);
  const userPrefs = useAppSelector((state) => state.userPref);
  const userData = useAppSelector((state) => state?.userData);
  const { toast } = useToast();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (userData?.lastLoggedIn) {
      const momentInstance = moment(Number(userData.lastLoggedIn));
      const lastloggedInTime = moment().diff(momentInstance);

      if (lastloggedInTime < 60000) {
        toast({
          title: "success",
          description: "Logged in successfully!",
          className: "bg-green-600",
          variant: "success",
        });
      }
    }
  }, [userData]);

  return (
    <Container>
      <div className="font-text h-full">
        {userData ? <VerifyAccountEmail /> : null}
        <div className="grid grid-rows-[auto_1fr] h-full">
          <div className="hidden md:block">
            <Header />
          </div>
          <div className="flex">
            <div className="h-full provider z-0  ">
              <SidebarProvider open={userPrefs.sidebar}>
                <SidebarComponent />
                <SidebarTrigger className="hidden" ref={sidebarToggleButton} />
              </SidebarProvider>
            </div>
            <div className="w-full md:border-l-[1px] md:border-t md:dark:border-white flex flex-grow flex-row-reverse">
              <div className="h-full flex-1">
                <Outlet />
              </div>
              <div
                onClick={() => {
                  if (sidebarToggleButton.current) {
                    sidebarToggleButton.current.click();
                    dispatch(
                      updateUserPrefs({
                        ...userPrefs,
                        sidebar: !userPrefs.sidebar,
                      })
                    );
                  }
                }}
                className="max-md:hidden flex items-center text-xl cursor-pointer hover:bg-[#ffffff30]"
              >
                <ion-icon name="menu-outline"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Container>
  );
}

export default App;
