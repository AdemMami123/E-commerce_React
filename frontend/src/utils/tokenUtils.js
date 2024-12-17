import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Correct the import

export const getTokenFromCookies = () => {
  const token = Cookies.get("authToken");
  if (token) {
    try {
      const decoded = jwtDecode(token); // Use jwtDecode instead of jwt_decode
      const currentTime = Date.now() / 1000; // Get current time in seconds
      if (decoded.exp < currentTime) {
        console.log("Token expired");
        return null; // Token is expired
      }
      return token; // Return valid token
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  }
  return null;
};
