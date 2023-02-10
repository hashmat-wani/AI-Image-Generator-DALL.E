import { useEffect, useState } from "react";

const useDebounce = (val, delay = 500) => {
  const [debouncedVal, setDebouncedVal] = useState(val);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedVal(val);
    }, delay);

    return () => clearTimeout(id);
  });

  return debouncedVal;
};

export default useDebounce;
