import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import MobileSidebar from "../components/layout/MobileSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#F6F3EC] dark:bg-[#161F1C]">
      <Sidebar />
     <MobileSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto p-5">
  <div className="mx-auto max-w-[1600px]">
    <Outlet />
  </div>
</main>
      </div>
    </div>
  );
};

export default AdminLayout;