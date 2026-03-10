import style from "../Css/Item.module.css";

const Item = ({ data }) => {
  return (
    <div className={style.item}>
      <div className={style.left}>
        <div className={style.img_box}>
          <img src={data.image} alt="" />
          <div>{data.quantity}</div>
        </div>
        <h1>{data.title}</h1>
      </div>
      <p className="price">${Math.round(+data.quantity * +data.price)}</p>
    </div>
  );
};

export default Item;
