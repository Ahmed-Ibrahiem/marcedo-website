import { useEffect } from "react";

const useOutside_click = (ref, callback) => {
  useEffect(() => {
    const handle_click = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("click", handle_click);

    return () => {
      document.removeEventListener("click", handle_click);
    };
  }, [ref, callback]);
};

export default useOutside_click;
