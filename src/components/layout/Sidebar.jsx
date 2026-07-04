import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { navigation } from "../../constants/navigation";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";

import logo from "../../assets/popfresh-logo.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state.sidebar);

  return (
    <aside
      className={`hidden lg:flex h-screen sticky top-0 border-r border-[#E6E0D5] dark:border-[#2A3933] bg-white dark:bg-[#111916] transition-all duration-300 flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="relative border-b border-[#E6E0D5] dark:border-[#24322D] px-4 py-5">
        <div className="flex items-center gap-3">
            <Link to="/">
          <img
            src={logo}
            alt="POPFRESH"
            className="h-12 w-auto object-contain"
          />
          </Link>

          {!isCollapsed && (
            <div className="hidden md:block">
              <h2 className="text-[18px] font-bold text-[#032F23] dark:text-[#F3F4F1]">
                POPFRESH
              </h2>

              <p className="text-[12px] text-slate-500 dark:text-[#A8B3AC]">
                ADMIN SUITE
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="
            absolute
            -right-3
            top-1/2
            -translate-y-1/2
            bg-white
            dark:bg-[#1D2A25]
            border
            border-[#E6E0D5]
            dark:border-[#2A3933]
            rounded-full
            p-1
            shadow-sm
          "
        >
          {isCollapsed ? (
            <ChevronRight
              size={14}
              className="text-slate-600 dark:text-[#A8C89A]"
            />
          ) : (
            <ChevronLeft
              size={14}
              className="text-slate-600 dark:text-[#A8C89A]"
            />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                ${
                  isActive
                    ? "bg-[#032F23] text-white dark:bg-[#A8C89A] dark:text-[#0F1412]"
                    : "text-slate-700 hover:bg-[#F6F3EC] dark:text-[#A8B3AC] dark:hover:bg-[#1D2A25]"
                }`
              }
            >
              <Icon size={20} />

              {!isCollapsed && (
                <span className="hidden md:inline font-medium">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="hidden lg:block">
          <div className="border-t border-[#E6E0D5] dark:border-[#24322D] p-4">
            <div className="rounded-xl bg-[#F6F3EC] dark:bg-[#1D2A25] p-3">
              <p className="text-sm font-semibold text-[#032F23] dark:text-[#F3F4F1]">
                POPFRESH
              </p>

              <p className="text-xs text-slate-500 dark:text-[#A8B3AC]">
                Admin Suite v1.0
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;