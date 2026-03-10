import style from "./Our_video_component.module.css";

const Our_video_component = ({ video_url, stop_video }) => {
  return (
    <div className={style.our_video_area}>
      <div className={style.video_container}>
        <button onClick={() => stop_video()} className={style.play}>

            <i className="fa-solid fa-xmark"></i>
        </button>
        <iframe src={video_url} title="YouTube video" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default Our_video_component;
