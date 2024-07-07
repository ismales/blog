import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.token);
  return token ? children : <Navigate to='/sign-in' replace />;
}
