import {
  Menu,
  Search,
  Moon,
  Sun,
  Bell,
  User,
  Settings,
  LogOut,
  Package,
  ShoppingBag,
  Users,
  X,
  IndianRupee
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../../theme/ThemeProvider";

import { useDispatch } from "react-redux";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead
} from "../../api/notification.api";
import { search as searchApi } from "../../api/search.api";
import { openMobileSidebar } from "../../redux/slices/sidebarSlice";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { socket } = useSocket();

  

  /* --------------------------------------- */
  /* Search                                 */
  /* --------------------------------------- */

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
const [searchLoading, setSearchLoading] = useState(false);

  const [showSearch, setShowSearch] =
    useState(false);

  /* --------------------------------------- */
  /* Notifications                          */
  /* --------------------------------------- */

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] = useState([]);

const [notificationLoading, setNotificationLoading] =
  useState(false);

  /* --------------------------------------- */
  /* Profile                                */
  /* --------------------------------------- */

  const [showProfile, setShowProfile] =
    useState(false);

  /* --------------------------------------- */
  /* Refs                                   */
  /* --------------------------------------- */

  const notificationRef = useRef(null);

  const profileRef = useRef(null);

  const searchRef = useRef(null);

  /* --------------------------------------- */
  /* Global Search Data                      */
  /* --------------------------------------- */

 
  


  const fetchSearchResults = async (query) => {
  try {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);

    const data = await searchApi(query);

    setSearchResults(data);
  } catch (error) {
    console.error(error);
  } finally {
    setSearchLoading(false);
  }
};

const fetchNotifications = async () => {
  try {
    setNotificationLoading(true);

    const data = await getNotifications();

    setNotifications(data);
  } catch (error) {
    console.error(error);
  } finally {
    setNotificationLoading(false);
  }
};

const handleNotificationClick = async (
  notification
) => {
  try {
    if (!notification.isRead) {
      await markNotificationRead(notification.id);
    }

    navigate(notification.route, {
      state: {
        entityId: notification.entityId,
      },
    });

    setShowNotifications(false);

    fetchNotifications();
  } catch (error) {
    console.error(error);
  }
};
  /* --------------------------------------- */
  /* Keyboard Shortcut                       */
  /* --------------------------------------- */

  useEffect(() => {
    const handleShortcut = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "k"
      ) {
        e.preventDefault();

        searchRef.current?.focus();
      }
    };

    window.addEventListener(
      "keydown",
      handleShortcut
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleShortcut
      );
  }, []);

  /* --------------------------------------- */
/* Escape Key                              */
/* --------------------------------------- */

useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setShowSearch(false);
    }
  };

  window.addEventListener(
    "keydown",
    handleEscape
  );

  return () =>
    window.removeEventListener(
      "keydown",
      handleEscape
    );
}, []);
    /* --------------------------------------- */
  /* Click Outside Handler                   */
  /* --------------------------------------- */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    fetchSearchResults(searchQuery);
  }, 300);

  return () => clearTimeout(timer);
}, [searchQuery]);

useEffect(() => {
  fetchNotifications();
}, []);

useEffect(() => {
  const handleNewNotification = () => {
    fetchNotifications();
  };

  socket.on("notification:new", handleNewNotification);

  return () => {
    socket.off("notification:new", handleNewNotification);
  };
}, [socket]);

  /* --------------------------------------- */
  /* Notification Helpers                    */
  /* --------------------------------------- */
const unreadCount = notifications.filter(
  (notification) => !notification.isRead
).length;

  // const unreadCount = notifications.filter(
  //   (notification) => notification.unread
  // ).length;

  const markAllAsRead = async () => {
  try {
    await markAllNotificationsRead();

    await fetchNotifications();
  } catch (error) {
    console.error(error);
  }
};

  /* --------------------------------------- */
  /* Search Navigation                       */
  /* --------------------------------------- */

  const handleSearchClick = (item) => {
 navigate(item.route, {
  state: {
    entityId: item.entityId,
  },
});

    setSearchQuery("");
setSearchResults([]);

    setShowSearch(false);
  };

  /* --------------------------------------- */
  /* Profile Actions                         */
  /* --------------------------------------- */

  
const handleLogout = () => {
  setShowProfile(false);
  logout();


  navigate("/login", {
    replace: true,
  });
};

/* --------------------------------------- */
/* Logged In User                          */
/* --------------------------------------- */

const userName = user?.name || "Administrator";

const userRole = user?.role || "Admin";

const avatarLetter =
  user?.name?.charAt(0).toUpperCase() || "A";

  const userEmail = user?.email || "";
  /* --------------------------------------- */
  /* Notification Toggle                     */
  /* --------------------------------------- */

//  const toggleNotifications = async () => {
//   if (!showNotifications) {
//     await fetchNotifications();
//   }

//   setShowNotifications((prev) => !prev);

//   setShowProfile(false);
// };

const toggleNotifications = () => {
  setShowNotifications((prev) => !prev);
  setShowProfile(false);
};

  /* --------------------------------------- */
  /* Profile Toggle                          */
  /* --------------------------------------- */

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);

    setShowNotifications(false);
  };

  /* --------------------------------------- */
  /* Search Input                            */
  /* --------------------------------------- */
// const handleSearch = (e) => {
//   const value = e.target.value;

//   setSearchQuery(value);
//   setShowSearch(true);

//   fetchSearchResults(value);
// };

const handleSearch = (e) => {
  const value = e.target.value;

  setSearchQuery(value);
  setShowSearch(true);
};

const iconMap = {
  Product: Package,
  Customer: Users,
  Order: ShoppingBag,
};





  return (
  <header
    className="
      h-18
      shrink-0
      border-b
      border-[#E6E0D5]
      dark:border-[#24322D]
      bg-white
      dark:bg-[#111916]
      px-6
      flex
      items-center
      justify-between
    "
  >
    {/* Left */}

    <div className="flex items-center gap-3 w-full max-w-[450px]">

      <button
        onClick={() => dispatch(openMobileSidebar())}
        className="
          lg:hidden
          p-2
          rounded-lg
          hover:bg-slate-100
          dark:hover:bg-[#1D2A25]
        "
      >
        <Menu
          size={22}
          className="text-slate-700 dark:text-white"
        />
      </button>

      {/* Search */}

      <div
        ref={searchRef}
        className="relative flex-1"
      >

        <Search
          size={18}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
            dark:text-[#7C8A83]
          "
        />

        <input
          
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => setShowSearch(true)}
          type="text"
          placeholder="Search orders, customers, products..."
          className="
            w-full
            rounded-xl
            border
            border-[#D8D5CD]
            dark:border-[#2A3933]
            bg-white
            dark:bg-[#1A2420]
            text-slate-900
            dark:text-[#F3F4F1]
            placeholder:text-slate-400
            dark:placeholder:text-[#7C8A83]
            py-2.5
            pl-10
            pr-4
            outline-none
            transition-all
            focus:border-[#D6B86B]
          "
        />
                {/* Search Results */}

        {showSearch && searchQuery.length > 0 && (

          <div
            className="
fixed
left-1/2
top-20
-translate-x-1/2


z-50
w-[94vw]
max-w-sm
-translate-x-1/2
overflow-hidden
rounded-2xl
border
border-[#E6E0D5]
dark:border-[#2A3933]
bg-white
dark:bg-[#18211D]
shadow-2xl

sm:absolute
sm:left-0
sm:right-0
sm:top-[110%]
sm:w-full
sm:max-w-none
sm:translate-x-0
"
          >

            {searchLoading ? (
  <div className="px-6 py-6 text-center text-slate-500">
    <div className="flex justify-center py-6">
  <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
</div>
  </div>
) : searchResults.length > 0 ? (

              searchResults.map((item) => {

                const Icon = iconMap[item.type];

                

                return (

                  <button
                    key={item.id}
                    onClick={() =>
                      handleSearchClick(item)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-4
                      border-b
                      border-slate-100
                      dark:border-[#24322D]
                      px-5
                      py-4
                      text-left
                      transition
                      hover:bg-orange-50
                      dark:hover:bg-[#1D2A25]
                    "
                  >

                    <div
                      className="
                        rounded-xl
                        bg-orange-100
                        p-2.5
                      "
                    >

                      <Icon
                        size={18}
                        className="text-orange-600"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.subtitle}
                      </p>

                    </div>

                  </button>

                );

              })

            ) : (

              <div className="px-6 py-8 text-center">

                <Search
                  size={34}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm text-slate-500">
                  No matching results
                </p>

              </div>

            )}

          </div>

        )}

      </div>

    </div>
        {/* Right */}

    <div className="flex items-center gap-3 lg:gap-4">

      {/* Theme */}

      <button
        onClick={toggleTheme}
        className="
          rounded-xl
          p-2.5
          text-slate-600
          transition
          hover:bg-[#F6F3EC]
          dark:text-[#A8B3AC]
          dark:hover:bg-[#1D2A25]
        "
      >
        {theme === "light" ? (
          <Moon size={20} />
        ) : (
          <Sun size={20} />
        )}
      </button>

      {/* Notifications */}

      <div
        ref={notificationRef}
        className="relative"
      >

        <button
         onClick={toggleNotifications}
          className="
            relative
            rounded-xl
            p-2.5
            text-slate-600
            transition
            hover:bg-[#F6F3EC]
            dark:text-[#A8B3AC]
            dark:hover:bg-[#1D2A25]
          "
        >

          <Bell size={20} />

          {unreadCount > 0 && (

            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-[11px]
                font-semibold
                text-white
              "
            >
              {unreadCount}
            </span>

          )}

        </button>
                {/* Notifications Dropdown */}

        {showNotifications && (

          <div
            className="
fixed
top-20
left-1/2
z-50

w-[94vw]
max-w-sm

-translate-x-1/2

overflow-hidden
rounded-2xl

border
border-[#E6E0D5]
dark:border-[#2A3933]

bg-white
dark:bg-[#18211D]

shadow-2xl

sm:absolute
sm:right-0
sm:left-auto
sm:top-14
sm:w-96
sm:max-w-none
sm:translate-x-0
"
          >

            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                dark:border-[#24322D]
                px-5
                py-4
              "
            >

              <div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Notifications
                </h3>

                <p className="text-xs text-slate-500">
                  {unreadCount} unread
                </p>

              </div>

              <button
                onClick={markAllAsRead}
                className="
                  text-sm
                  font-medium
                  text-orange-600
                  hover:text-orange-700
                "
              >
                Mark all
              </button>

            </div>

            

            {/* List */}

<div className="max-h-96 overflow-y-auto">

  {notificationLoading ? (

    <div className="flex justify-center py-8">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
    </div>

  ) : notifications.length > 0 ? (

    notifications.map((notification) => (
      

      <button
        key={notification.id}
        onClick={() => handleNotificationClick(notification)}
        className="
          flex
          w-full
          gap-4
          border-b
          border-slate-100
          dark:border-[#24322D]
          px-5
          py-4
          text-left
          transition
          hover:bg-orange-50
          dark:hover:bg-[#1D2A25]
        "
      >

        <div
          className={`
            mt-1
            h-2.5
            w-2.5
            rounded-full
            ${
              notification.priority === "high"
                ? "bg-red-500"
                : notification.priority === "medium"
                ? "bg-orange-500"
                : "bg-green-500"
            }
          `}
        />

        <div className="flex-1">

          <p className="font-medium text-slate-900 dark:text-white">
            {notification.title}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {notification.message}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {new Date(notification.createdAt).toLocaleString()}
          </p>

        </div>

      </button>

    ))

  ) : (

    <div className="py-8 text-center text-slate-500">
      No notifications
    </div>

  )}

</div>

          </div>

        )}

      </div>
            {/* Profile */}

      <div
        ref={profileRef}
        className="relative"
      >

        <button
          onClick={toggleProfile}
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-2
            py-1.5
            transition
            hover:bg-[#F6F3EC]
            dark:hover:bg-[#1D2A25]
          "
        >

          <div
  className="
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    bg-[#D6B86B]
    font-semibold
    text-[#0F1412]
  "
>
  {avatarLetter}
</div>

          <div className="hidden text-left sm:block">

            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {userName}
            </p>

            <p className="text-xs text-slate-500">
              {userRole}
            </p>

          </div>

        </button>

        {/* Profile Dropdown */}

        {showProfile && (

          <div
            className="
              absolute
              right-0
              top-14
              z-50
              w-72
              overflow-hidden
              rounded-2xl
              border
              border-[#E6E0D5]
              dark:border-[#2A3933]
              bg-white
              dark:bg-[#18211D]
              shadow-2xl
            "
          >

            {/* Header */}

            <div className="border-b border-slate-100 dark:border-[#24322D] p-5">

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#D6B86B]
                    font-semibold
                    text-lg
                    text-[#0F1412]
                  "
                >
                   {avatarLetter}
                </div>

                <div>

  <h3 className="font-semibold text-slate-900 dark:text-white">
    {userName}
  </h3>

  <p className="text-sm text-slate-500 capitalize">
    {userRole}
  </p>

  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 truncate">
    {userEmail}
  </p>

</div>

              </div>

            </div>

            {/* Menu */}

            <div className="py-2">

         <button
 onClick={() => {
  setShowProfile(false);

  navigate("/settings");
}}
  className="
    flex
    w-full
    items-center
    gap-3
    px-5
    py-3
    text-left
    transition
    hover:bg-orange-50
    dark:hover:bg-[#4a6a5e]
    dark:text-white
  "
>
  <User size={18} />
  Manage Account
</button>
              <button
                onClick={toggleTheme}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-3
                  text-left
                  transition
                  hover:bg-orange-50
                  dark:hover:bg-[#4a6a5e]
                  dark:text-white
                "
              >
                <Settings size={18} />

                {theme === "light"
                  ? "Dark Mode"
                  : "Light Mode"}

              </button>

              <button
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-3
                  text-left
                  text-red-600
                  dark:text-red-400
                  transition
                  hover:bg-red-50
                "
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  </header>

);

};

export default Navbar;

// import {
//   Menu,
//   Search,
//   Moon,
//   Sun,
//   Bell,
// } from "lucide-react";

// import { useTheme } from "../../theme/ThemeProvider";
// import { useDispatch } from "react-redux";
// import { openMobileSidebar } from "../../redux/slices/sidebarSlice";

// const Navbar = () => {
//   const { theme, toggleTheme } = useTheme();
//   const dispatch = useDispatch();

//   return (
//     <header
//       className="
//       h-18
//       shrink-0
//       border-b
//       border-[#E6E0D5]
//       dark:border-[#24322D]
//       bg-white
//       dark:bg-[#111916]
//       px-6
//       flex
//       items-center
//       justify-between
//       "
//     >
//       {/* Left */}
//       <div className="flex items-center gap-3 w-full max-w-[420px]">
//         <button
//           onClick={() => dispatch(openMobileSidebar())}
//           className="
//           lg:hidden
//           p-2
//           rounded-lg
//           hover:bg-slate-100
//           dark:hover:bg-[#1D2A25]
//           "
//         >
//           <Menu
//   size={22}
//   className="text-slate-700 dark:text-white"
// />
//         </button>

//         <div className="relative flex-1">
//           <Search
//             size={18}
//             className="
//             absolute
//             left-3
//             top-1/2
//             -translate-y-1/2
//             text-slate-400
//             dark:text-[#7C8A83]
//             "
//           />

//           <input
//             type="text"
//             placeholder="Search orders, customers, products..."
//             className="
//             w-full
//             rounded-xl
//             border
//             border-[#D8D5CD]
//             dark:border-[#2A3933]
//             bg-white
//             dark:bg-[#1A2420]
//             text-slate-900
//             dark:text-[#F3F4F1]
//             placeholder:text-slate-400
//             dark:placeholder:text-[#7C8A83]
//             py-2.5
//             pl-10
//             pr-4
//             outline-none
//             transition-all
//             focus:border-[#D6B86B]
//             "
//           />
//         </div>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-3 lg:gap-4">
//         <button
//           onClick={toggleTheme}
//           className="
//           p-2.5
//           rounded-xl
//           text-slate-600
//           dark:text-[#A8B3AC]
//           hover:bg-[#F6F3EC]
//           dark:hover:bg-[#1D2A25]
//           "
//         >
//           {theme === "light" ? (
//             <Moon size={20} />
//           ) : (
//             <Sun size={20} />
//           )}
//         </button>

//         <button
//           className="
//           p-2.5
//           rounded-xl
//           text-slate-600
//           dark:text-[#A8B3AC]
//           hover:bg-[#F6F3EC]
//           dark:hover:bg-[#1D2A25]
//           "
//         >
//           <Bell size={20} />
//         </button>

//         <div className="flex items-center gap-3">
//           <div
//             className="
//             h-10
//             w-10
//             rounded-full
//             bg-[#D6B86B]
//             text-[#0F1412]
//             flex
//             items-center
//             justify-center
//             font-semibold
//             "
//           >
//             M
//           </div>

//           <div className="hidden sm:block">
//             <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F3F4F1]">
//               Mohit
//             </p>

//             <p className="text-xs text-slate-500 dark:text-[#A8B3AC]">
//               Administrator
//             </p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;