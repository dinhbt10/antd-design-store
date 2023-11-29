import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/auth/login";
import ContactPage from "./pages/contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Home";
import RegisterPage from "./pages/auth/register";
import { callFetchAccount } from "./services";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/authSlice/authSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutClient from "./layout/LayoutClient";
import LayoutAdmin from "./layout/LayoutAdmin";
import CalendarPage from "./pages/calendar";

// const LayoutAdmin = () => {
//   const isAdminRoute = window.location.pathname.startsWith("/admin");
//   const { user } = useSelector((store) => store.auth);
//   const userRole = user.role;
//   return (
//     <>
//       {isAdminRoute && userRole === "ADMIN" && <Header />}
//       <Outlet />
//       {isAdminRoute && userRole === "ADMIN" && <Footer />}
//     </>
//   );
// };

export default function App() {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((store) => store.auth);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;

    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutClient />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "calender",
          element: <CalendarPage />,
        },
      ],
    },
    {
      path: "/login",
      element: !isAuthenticated && <Login />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <AdminPage />,
        },
        {
          path: "users",
          element: <ContactPage />,
        },
        {
          path: "books",
          element: <ContactPage />,
        },
        {
          path: "orders",
          element: <ContactPage />,
        },
      ],
    },
  ]);
  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
