import { useState } from "react";
import { useCartContext } from "../../../Context/CartMenuContext";
import Skeleton from "react-loading-skeleton";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

const ItemOfCart = ({ item_data }) => {
  const { addItem, removeItem, decrementItemCount } = useCartContext();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full flex items-center gap-5 relative">
      <div className="min-w-20 w-20  h-22.5  bg-gray-light rounded-sm flex-center">
        <img
          className="max-w-[80%] max-h-[90%] object-contain"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          src={item_data.thumbnail}
          alt={`The Image Of Product ${item_data.id}`}
        />
      </div>
      {/* Item Inof */}
      <div className="flex-start-col gap-1.5 max-w-50 text-sm!">
        {/* item name */}
        <div className="line-clamp-1 text-gray max-w-[90%]">
          {item_data.name}
        </div>

        {/* Item Variants */}
        <div className="text-xs font-semibold flex-start-col gap-1.5">
          {Object.entries(item_data.variants.attributes).map(
            ([key, value], index) => {
              return (
                <div key={index}>
                  <span>{key}</span>: <span>{value}</span>
                </div>
              );
            },
          )}
        </div>

        {/* item price & actions */}
        <div className="flex-start gap-5">
          {/* item price */}
          <div className="text-orange font-semibold">
            {item_data.quantity} x{" "}
            {+item_data.variants.price}$
          </div>
          {/* item Actions */}
          <div className="flex-center gap-1.5">
            <button
              className="w-6 h-6 bg-gray-light! text-[10px]! flex-center border border-border text-gray"
              onClick={() => addItem(item_data)}
            >
              <FaPlus />
            </button>
            <span className="w-6 h-6 bg-white text-center border border-border">
              {item_data.quantity}
            </span>
            <button
              className="w-6 h-6 bg-gray-light! text-[10px]! flex-center border border-border text-gray"
              onClick={() => decrementItemCount(item_data)}
            >
              <FaMinus />
            </button>
          </div>
        </div>
      </div>
      {/* Delete Item */}
      <button
        className="absolute right-0 xs:right-5 top-0 xs:top-[50%] xs:translate-y-[-50%] text-lg text-gray hover:text-orange"
        onClick={() => removeItem(item_data)}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default ItemOfCart;
