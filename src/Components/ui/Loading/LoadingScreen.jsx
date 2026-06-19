import style from "./Loading.module.css";

const LoadingScreen = () => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-white flex-center z-1000">
      <div className={style.container}>
        <div className={style.box}></div>
        <div className={style.box}></div>
        <div className={style.box}></div>
        <div className={style.box}></div>
        <div className={style.box}></div>
      </div>
    </div>
  );
};

export default LoadingScreen
