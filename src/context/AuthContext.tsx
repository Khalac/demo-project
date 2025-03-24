import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { SignUpSchema } from "@/schema/signup.schema";
import { LoginSchema } from "@/schema/login.schema";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login, logout } from "@/redux/slice/likedCardSlice";
type LoginType = z.infer<typeof LoginSchema>;
type SignUpType = z.infer<typeof SignUpSchema>;

type LikedCardType = {
  id: string;
  name: string;
  image: string;
  types: string[];
};

type UserType = {
  name: string;
  email: string;
  password: string;
  likedCards: LikedCardType[];
};

export const AuthContext = createContext({
  currentUser: {
    name: "",
    email: "",
    password: "",
    likedCards: [],
    types: [],
  } as UserType,
  Login: (data: LoginType): boolean => {
    console.log(data);
    return false;
  },
  Logout: () => {},
  SignUp: (data: SignUpType): boolean => {
    console.log(data);
    return false;
  },
});

const AuthProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );
  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser") || "null"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const SignUp = (data: SignUpType) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((a: SignUpType) => a.email === data.email)) {
      return false;
    }
    users.push({
      name: data.name,
      email: data.email,
      password: data.password,
      likedCards: [],
    });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };
  const Login = (data: LoginType) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((a: LoginType) => {
      return a.email === data.email && a.password === data.password;
    });

    if (user) {
      dispatch(login(user));
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };
  const Logout = () => {
    dispatch(logout());

    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };
  return (
    <AuthContext.Provider value={{ currentUser, Login, Logout, SignUp }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
