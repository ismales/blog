import { Navigate } from "react-router-dom";

const isAuth = () => {
  const user = localStorage.getItem("user");
  return !!user;
};

export default function PrivateRoute({ children }) {
  return isAuth() ? children : <Navigate to='/sign-in' replace />;
}
