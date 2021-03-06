import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

export const UserContext = React.createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, uid } = user;
        setUser({
          displayName,
          uid,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
