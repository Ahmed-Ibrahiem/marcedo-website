import style from "../Css/Item.module.css";

const Item = ({ data }) => {
  return (
    <div className={style.item}>
      <div className={style.left}>
        <div className={style.img_box}>
          <img src={data.thumbnail} alt="" />
          <div>{data.quantity}</div>
        </div>
        <h1>{data.name}</h1>
      </div>
      <p className="price">${Math.round(+data.quantity * +data.current_price)}</p>
    </div>
  );
};

export default Item;
