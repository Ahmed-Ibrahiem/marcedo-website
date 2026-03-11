import { useSearchContext } from "../../../Context/SearchContext";
import styles from "./SearchOverlay.module.css";

const SearchOverlay = () => {
  const { isSearchOverlayOpen, setIsSearchOverlayOpen } = useSearchContext();
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
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className={styles.search_box}>
          <input type="text" placeholder="Enter Your Product Name" />
          <button className={styles.search_submit}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
