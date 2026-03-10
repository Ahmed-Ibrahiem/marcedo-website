import "../Recommendations/Recommendatinos.css";
const Recommendations = () => {
  return (
    <div className="container">
      <div className="recommendation">
        <h2>Recommendation</h2>
        <div className="products-container"></div>
        <div className="best-seller">
          <button className="see-all-products">See All Products</button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
