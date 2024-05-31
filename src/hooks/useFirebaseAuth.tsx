import {
  useState,
  useEffect,
  useMemo,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";

import { auth, provider } from "../firebase";
import { redirect } from "react-router-dom";

interface AuthContextType {
  loading: any;
  signOutUser: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  user: any | null;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      const result: any = await signInWithRedirect(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const signOutUser = async () => {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Logout successful");
        })
        .catch((error: any) => {
          // An error happened.
          console.log("Logout failed", error);
        });
      setUser(null);
      redirect("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({ user, loading, signInWithGoogle, signOutUser }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useFirebaseAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
