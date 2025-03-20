import { useState, useEffect } from "react";

const useDebounce = (str: string, time: number, type?: string) => {
  const [value, setValue] = useState(str);
  useEffect(() => {
    const delay = setTimeout(() => {
      setValue(str);
    }, time);
    return () => {
      clearTimeout(delay);
    };
  }, [str, time, type]);
  return value;
};

export default useDebounce;
