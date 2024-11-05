import {
  SidebarComponent,
  Header,
  SidebarProvider,
  SidebarTrigger,
  Container,
} from "./components/index";
import { Outlet } from "react-router";
import { useRef } from "react"
function App() {
  const sidebarToggleButton = useRef<HTMLButtonElement | null>(null);
  return (
    <Container>
      <div className="font-text h-full">
        <div className="grid grid-rows-[auto_1fr] h-full">
          <div>
            <Header />
          </div>
          <div className="flex">
            <div className="h-full provider z-0  ">
              <SidebarProvider>
                <SidebarComponent />
                <SidebarTrigger className="hidden" ref={sidebarToggleButton} />
              </SidebarProvider>
            </div>
            <div className="w-full border-l-[1px] dark:border-white flex flex-grow flex-row-reverse">
              <div className="h-full flex-1">
                <Outlet />
              </div>
              <div
                onClick={() => {
                  if (sidebarToggleButton.current) {
                    sidebarToggleButton.current.click();
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
    </Container>
  );
}

export default App;
