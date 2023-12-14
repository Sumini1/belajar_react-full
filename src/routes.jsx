import Home from "./pages/Home";
import Login from "./pages/Login";
import NewMenu from "./pages/NewMenu";
import UserDetail from "./pages/UserDetail";
import ProtectedRoute from "./hoc/ProtectedRoute";



export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/new-menu",
    element: (
      <ProtectedRoute>
        <NewMenu />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <ProtectedRoute>
        <UserDetail />
      </ProtectedRoute>
    ),
  },
];