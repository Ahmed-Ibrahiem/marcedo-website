import style from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={style.loading}>
      <img src="/assest/images/loading.png" loading="lazy"  alt="" />
      <p>Loading...</p>
    </div>
  );
};
