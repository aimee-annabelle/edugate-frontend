import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PublicLayout from "./pages/layout/PublicLayout";
import ProtectedLayout from "./pages/layout/ProtectedLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import ResourcesPage from "./pages/Resources";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Home /> },
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
        { path: "profile", element: <ProfilePage /> },
        { path: "resources", element: <ResourcesPage /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
