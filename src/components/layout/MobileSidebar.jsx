import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/popfresh-logo.png";
import { navigation } from "../../constants/navigation";
import { closeMobileSidebar } from "../../redux/slices/sidebarSlice";

const MobileSidebar = () => {
  const dispatch = useDispatch();

  const { mobileSidebarOpen } = useSelector(
    (state) => state.sidebar
  );

  if (!mobileSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="
          fixed
          inset-0
          z-40
          bg-black/50
          backdrop-blur-sm
          animate-fadeIn
          lg:hidden
        "
        onClick={() => dispatch(closeMobileSidebar())}
      />

      {/* Sidebar */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-72
          bg-white
          dark:bg-[#111916]
          border-r
          border-[#E6E0D5]
          dark:border-[#24322D]
          shadow-xl
          animate-slideInLeft
          lg:hidden
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#E6E0D5]
            dark:border-[#24322D]
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="POPFRESH"
              className="h-10 w-auto"
            />

            <div>
              <h2 className="text-base font-bold text-[#032F23] dark:text-[#F3F4F1]">
                POPFRESH
              </h2>

              <p className="text-xs text-slate-500 dark:text-[#A8B3AC]">
                ADMIN SUITE
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch(closeMobileSidebar())}
            className="
              p-2
              rounded-lg
              transition-all
              hover:bg-slate-100
              dark:hover:bg-[#1D2A25]
              text-slate-700
              dark:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() =>
                  dispatch(closeMobileSidebar())
                }
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#A8C89A] text-[#0F1412]"
                      : "text-slate-700 dark:text-[#A8B3AC] hover:bg-[#F6F3EC] dark:hover:bg-[#1D2A25]"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;