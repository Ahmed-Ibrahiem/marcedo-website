import style from "../Css/Item.module.css";

const Item = ({ data }) => {
  return (
    <div className={style.item}>
      <div className={style.left}>
        <div className={style.img_box}>
          <img src={data.thumbnail} alt="" loading="lazy" />
          <div>{data.quantity}</div>
        </div>
        <div className="flex-start-col gap-1 text-sm">
          <h1>{data.name}</h1>
          {data.variants &&
            Object.entries(data.variants.attributes).map(([key, value]) => {
              return (
                <p key={key}>
                  <strong>{key}</strong> : {value}
                </p>
              );
            })}
        </div>
      </div>
      <div className="price flex-start gap-1.5">
        <p>{data.currency} </p>
        {Math.round(
          +data.quantity *
            (data.variants ? +data.variants.price : +data.current_price),
        )}
      </div>
    </div>
  );
};

export default Item;
