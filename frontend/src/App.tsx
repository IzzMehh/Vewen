import React from "react";
import {
  SidebarComponent,
  Header,
  SidebarProvider,
  SidebarTrigger,
  Container,
  Toaster,
} from "./components/index";
import { Outlet, useNavigate } from "react-router";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { updateUserPrefs } from "./store/userPreferencesSlice";

function App() {
  const sidebarToggleButton = useRef<HTMLButtonElement | null>(null);
  const userPrefs = useAppSelector((state) => state.userPref);
  const userData = useAppSelector((state) => state?.userData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  React.useEffect(() => {
    // if(!userData){
    //   navigate("/login")
    // }
  }, []);

  return (
    <Container>
      <div className="font-text h-full">
        <div className="grid grid-rows-[auto_1fr] h-full">
          <div>
            <Header />
          </div>
          <div className="flex">
            <div className="h-full provider z-0  ">
              <SidebarProvider open={userPrefs.sidebar}>
                <SidebarComponent />
                <SidebarTrigger className="hidden" ref={sidebarToggleButton} />
              </SidebarProvider>
            </div>
            <div className="w-full border-l-[1px] border-t dark:border-white flex flex-grow flex-row-reverse">
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
