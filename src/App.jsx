import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/auth/login";
import ContactPage from "./pages/contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Home";
import RegisterPage from "./pages/auth/register";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
