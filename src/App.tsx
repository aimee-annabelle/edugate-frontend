import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./pages/layout/PublicLayout";
import HomePage from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./pages/layout/ProtectedLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
    {
      path: "/dashboard",
      element: <ProtectedLayout />,
      children: [
        { index: true, element: <Dashboard /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster/>
    </>
  );
}

export default App;
