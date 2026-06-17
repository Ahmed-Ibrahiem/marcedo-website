import style from "../Css/Item.module.css";

const Item = ({ data }) => {
  return (
    <div className={style.item}>
      <div className={style.left}>
        <div className={style.img_box}>
          <img src={data.thumbnail} alt="" loading="lazy"/>
          <div>{data.quantity}</div>
        </div>
        <div className="flex-start-col gap-1 text-sm">
          <h1>{data.name}</h1>
          {Object.entries(data.variants.attributes).map(([key, value]) => {
            return (
              <p key={key}>
                <strong>{key}</strong> : {value}
              </p>
            );
          })}
        </div>
      </div>
      <p className="price">
        ${Math.round(+data.quantity * +data.variants.price)}
      </p>
    </div>
  );
};

export default Item;
