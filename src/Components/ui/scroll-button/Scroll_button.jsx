import { useEffect, useRef, useState } from "react";
import "./Scroll_button.css";

const Scroll_button = () => {
  const scroll_button_ref = useRef(null);

  const [is_scroll_btn_show, set_scroll_btn_show] = useState(false);

  function scroll_to_top() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const toggle_scroll_btn = () => {
    if (scrollY > 500) set_scroll_btn_show(true);
    else set_scroll_btn_show(false);
  };

  useEffect(() => {
    if (!scroll_button_ref.current) return;
    
    window.addEventListener("scroll", toggle_scroll_btn);

    scroll_button_ref.current.addEventListener("click", () => {});

    return () => {
      window.removeEventListener("scroll", toggle_scroll_btn);
    };
  }, []);

  return (
    <button
      className={`scroll_button ${
        is_scroll_btn_show ? "show_scroll_btn" : "hide_scroll_btn"
      }`}
      ref={scroll_button_ref}
      onClick={scroll_to_top}
    >
      <i className="fa-solid fa-long-arrow-up"></i>
    </button>
  );
};

export default Scroll_button;
