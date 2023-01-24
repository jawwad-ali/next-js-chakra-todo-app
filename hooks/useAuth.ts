import { useEffect, useState } from "react";
import { auth } from "../firebase";

interface User {
  [x: string]: string | null | boolean
}
 
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setIsLoggedIn(user && user.uid ? true : false);
      setUser(user);
    });
  }, []);
  return { user, isLoggedIn };
};

export default useAuth;
