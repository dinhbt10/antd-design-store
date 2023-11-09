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

const Layout = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "50px",
          textAlign: "center",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const { user } = useSelector((store) => store.auth);
  const userRole = user.role;
  return (
    <>
      {isAdminRoute && userRole === "ADMIN" && <Header />}
      <Outlet />
      {isAdminRoute && userRole === "ADMIN" && <Footer />}
    </>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((store) => store.auth);

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
      element: <Layout />,
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
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: <ContactPage />,
        },
      ],
    },
  ]);
  return (
    <>
      {isAuthenticated === true ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
