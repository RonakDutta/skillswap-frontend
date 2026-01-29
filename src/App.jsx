import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import About from "./components/About";
import Marketplace from "./pages/Marketplace";
import PublicProfile from "./pages/PublicProfile";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch(
        "https://skillswap-api-7ysx.onrender.com/is-verify",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout isAuth={isAuthenticated} setAuth={setAuth} />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "marketplace",
          element: isAuthenticated ? (
            <Marketplace />
          ) : (
            <Navigate
              to="/login"
              state={{ message: "Access Denied. Login Required." }}
            />
          ),
        },
        {
          path: "wallet",
          element: (
            <div className="text-center text-2xl pt-20 text-white">
              Wallet Coming Soon
            </div>
          ),
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "login",
          element: <Login setAuth={setAuth} />,
        },
        {
          path: "signup",
          element: <Signup setAuth={setAuth} />,
        },
        {
          path: "dashboard",
          element: isAuthenticated ? <Dashboard /> : <Navigate to="/" />,
        },
        {
          path: "operator/:id",
          element: isAuthenticated ? <PublicProfile /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  // 2. THE FIX: Wrap the RouterProvider with ToastProvider
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
