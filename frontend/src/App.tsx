import { Sidebar, Header } from "./components/index";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="font-text h-full">
        <div className="grid grid-rows-[auto_1fr] h-full">
          <div>
            <Header />
          </div>
          <div className="flex">
            <div className="w-[200px] ">
              <Sidebar />
            </div>

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
