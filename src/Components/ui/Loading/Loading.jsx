import style from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-white flex-center">
      <div class={style.container}>
        <div class={style.box}></div>
        <div class={style.box}></div>
        <div class={style.box}></div>
        <div class={style.box}></div>
        <div class={style.box}></div>
      </div>
    </div>
  );
};
