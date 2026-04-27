import { useState } from "react";
import { useCartContext } from "../../../Context/CartMenuContext";
import styles from "../Cart_popup.module.css";
import Skeleton from "react-loading-skeleton";

const ItemOfCart = ({ item_data }) => {
  const { updateProductQuantity, removeItem } = useCartContext();
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles.item}>
      <div className={styles.image_box}>
        <img
          loading="lazy"
          onLoad={() => setLoaded(true)}
          src={item_data.image}
          alt={`The Image Of Product ${item_data.id}`}
        />
      </div>
      <div className={styles.item_details}>
        <div className={styles.title}>{item_data.title}</div>
        <div className={styles.item_price}>
          {item_data.quantity} x {+item_data.quantity * +item_data.price}$
        </div>
        <div className={styles.item_counter_prograss}>
          <button
            className={styles.plus}
            onClick={() => updateProductQuantity("plus", item_data.id)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button className={styles.count}>{item_data.quantity}</button>
          <button
            className={styles.minus}
            onClick={() => updateProductQuantity("minus", item_data.id)}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
      </div>
      <button
        className={styles.delete_item}
        onClick={() => removeItem(item_data)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default ItemOfCart;
