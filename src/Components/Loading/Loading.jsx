import style from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={style.loading}>
      <img src="/src/assets/loading.png"  alt="" />
      <p>Loading...</p>
    </div>
  );
};
