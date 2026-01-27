import NavBar from "../components/NavBar";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";



export default function AppLayout() {

  return (
    <div className="bg-white min-h-screen">
      <NavBar/>
      <div>
        <Outlet/>
      </div>
      <Toaster position="top-right"/>
    </div>
  )
}
