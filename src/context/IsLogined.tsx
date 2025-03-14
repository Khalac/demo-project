import { createContext, useState } from "react";
import type { ReactNode } from "react";
export const IsLoginedContext = createContext({
  isLogin: false,
  changeLogin: () => {},
});

const IsLogined = ({ children }: { children: ReactNode }): ReactNode => {
  const [isLogin, setIsLogin] = useState(false);
  const changeLogin = () => {
    setIsLogin(!isLogin);
    console.log("hello", isLogin);
  };
  return (
    <IsLoginedContext.Provider value={{ isLogin, changeLogin }}>
      {children}
    </IsLoginedContext.Provider>
  );
};
export default IsLogined;
