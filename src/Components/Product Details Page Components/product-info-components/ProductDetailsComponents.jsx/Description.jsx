import { use_product_detials_context } from "../../../../Context/Product_details_context";

const Description = () => {
  const { data } = use_product_detials_context();
  return (
    <div className="description">
      <h2>Description:</h2>
      <ul>
        {data.description.map((desc, index) => {
          return (
            <li key={index}>
              <div className="style_list"></div>
              <span>{desc}</span>
            </li>
          );
        })}
      </ul>
      <p>Chat us if there is anything you need to ask about the product :)</p>
      <button>
        <span>See More</span>
        <i className="fa-solid fa-caret-up"></i>
      </button>
    </div>
  );
};

export default Description;
