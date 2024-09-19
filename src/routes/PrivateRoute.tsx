import { Navigate } from "react-router-dom";
import { useUser } from "@contexts/UserProvider";

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute = ({ element: Component }: PrivateRouteProps) => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
