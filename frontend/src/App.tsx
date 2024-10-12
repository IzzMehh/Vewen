import { Navbar,Header } from "./components/index";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="font-text">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default App;
