import { use_pagination_context } from "../../../../Context/Pagination_provider";
import "./Bubbles.css";
const Bubbles = () => {
  const {
    current_package_index,
    set_current_package_index,
    number_of_packages,
  } = use_pagination_context();

  const [current_bubbles_index, set_current_bubble_index, num_of_rev_pag] = [
    current_package_index,
    set_current_package_index,
    number_of_packages,
  ];


  const get_bubbles_details = () => {
    const bubbles = [];

    if (num_of_rev_pag <= 5) {
      for (let i = 1; i <= num_of_rev_pag; i++) {
        bubbles.push(i);
      }
    } else {
      if (current_bubbles_index >= 3) {
        bubbles.push("dots");
      }

      for (
        let i = current_bubbles_index - 1;
        i <= current_bubbles_index + 1;
        i++
      ) {
        bubbles.push(i);
      }

      if (current_bubbles_index <= num_of_rev_pag - 2) {
        bubbles.push("dots");
      }
    }

    return bubbles.filter(
      (page) => (page > 0 && page <= num_of_rev_pag) || page == "dots",
    );
  };

  const increase_index = () => {
    if (current_bubbles_index < num_of_rev_pag) {
      set_current_bubble_index((prev) => prev + 1);
    }
  };
  const decrease_index = () => {
    if (current_bubbles_index > 1) {
      set_current_bubble_index((prev) => prev - 1);
    }
  };

  return (
    <div className="bubbles-container">
      <div className="bubbles-box">
        <button
          className={`${current_bubbles_index > 1 ? "active" : ""}`}
          onClick={decrease_index}
        >
          <i className="fa-solid fa-caret-left left"></i>
        </button>
        <div className="bubbles">
          {get_bubbles_details().map((bubble, index) => {
            if (bubble == "dots") {
              return <div key={index}>...</div>;
            } else {
              return (
                <div
                  key={index}
                  onClick={() => set_current_bubble_index(bubble)}
                  className={`bubble ${bubble == current_bubbles_index ? "current-bubble" : ""}`}
                >
                  {bubble}
                </div>
              );
            }
          })}
        </div>
        <button
          className={`${current_bubbles_index < num_of_rev_pag ? "active" : ""}`}
          onClick={increase_index}
        >
          <i className="fa-solid fa-caret-right right"></i>
        </button>
      </div>
      {location.pathname.includes("/product_detials") && (
        <span>See More Reviews</span>
      )}
    </div>
  );
};

export default Bubbles;
