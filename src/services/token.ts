import { jwtDecode, JwtPayload } from "jwt-decode";

const decodeToken = () => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    try {
      return jwtDecode<JwtPayload & { id: string }>(authToken);
    } catch (error) {
      console.error("token::decodedToken: ", error);
      return null;
    }
  } else {
    return null;
  }
};

const isTokenExpired = (expirationTime: number) => new Date().getTime() > expirationTime;

export { decodeToken, isTokenExpired };
