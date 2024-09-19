import { useUser } from "@contexts/UserProvider";
import { Navigate } from "react-router-dom";

type AuthRouteProps = {
  element: JSX.Element;
};

const AuthRoute = ({ element: Component }: AuthRouteProps) => {
  const { isAuthenticated } = useUser();

  return !isAuthenticated ? Component : <Navigate to="/processes" />;
};

export default AuthRoute;
