import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/Login";
import InviteSignup from "../pages/InviteSignup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Inventory from "../pages/Inventory";
import Customers from "../pages/Customers";
import Payments from "../pages/Payments";
import Team from "../pages/Team";
import Settings from "../pages/Settings";
import Shipping from "../pages/Shipping";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
       <Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

<Route
  path="/invite/:token"
  element={<InviteSignup />}
/>

<Route
  path="/forgot-password"
  
  element={
    <PublicRoute>
  <ForgotPassword />
  </PublicRoute>
  }
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>


        {/* Protected Admin Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shipping" element={<Shipping />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import AdminLayout from "../layouts/AdminLayout";

// import Dashboard from "../pages/Dashboard";
// import Orders from "../pages/Orders";
// import Products from "../pages/Products";
// import Inventory from "../pages/Inventory";
// import Customers from "../pages/Customers";
// import Payments from "../pages/Payments";
// import Team from "../pages/Team";

// import Settings from "../pages/Settings";
// import Shipping from "../pages/Shipping";

// const AppRoutes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<AdminLayout />}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/inventory" element={<Inventory />} />
//           <Route path="/customers" element={<Customers />} />
//           <Route path="/payments" element={<Payments />} />
//           <Route path="/team" element={<Team />} />
          
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/shipping" element={<Shipping />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRoutes;