import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import styles from "./SearchOverlay.module.css";

const SearchOverlay = ({ isSearchOverlayOpen, setIsSearchOverlayOpen }) => {
  return (
    <div
      className={`${styles.search_overlay} ${
        isSearchOverlayOpen ? styles.overlay_open : styles.overlay_close
      }`}
    >
      <div className={styles.content}>
        <button
          className={styles.exit_search_overlay}
          onClick={() => setIsSearchOverlayOpen(false)}
        >
          <FaXmark size={28} />
        </button>
        <div className={styles.search_box}>
          <input type="text" placeholder="Enter Your Product Name" />
          <button className="flex-center">
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
