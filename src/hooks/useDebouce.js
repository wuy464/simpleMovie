import { useEffect, useState } from "react";

export default function useDebouce(initialValue, delay = 500) {
  const [debouceValue, setDebouceValue] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouceValue(initialValue)
    }, delay);
    return () => {
        clearTimeout(timer)
    }
  }, [delay, initialValue]);
  return debouceValue;
}
