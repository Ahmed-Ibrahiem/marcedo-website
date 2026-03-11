import { use, useLayoutEffect, useState } from "react";
import Counter_template from "./components/counter-component/Counter_template";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import Our_video_component from "./components/our-video-component/Our_video_component";
import style from "./About_us.module.css";
const About_us = () => {
  const our_team = [
    {
      name: "Ahmed Ibrahiem",
      job_desc: "Web Developer",
      img: "/src/assets/developer.jpg",
    },
    {
      name: "Mahmoud Amara",
      job_desc: "UI/UX Designer",
      img: "/src/assets/designer.jpg",
    },
  ];
  const counter_data = [
    {
      title: "Stores Nationwide",
      count: 15,
    },
    {
      title: "Trust Customers",
      count: 2500,
    },
    {
      title: "Years of Experience",
      count: 12,
    },
    {
      title: "Product Types",
      count: 800,
    },
  ];
  const [start_video, set_start_video] = useState(false);
  const stop_video = () => {
    set_start_video(false);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about_us_area">
      <div className="container">
        <div className={style.page_container}>
          {/* Start Banner  */}
          <Our_banner page_data={{ title: "About Us" }} />

          {/* Start Intro (Just Image)  */}
          <div className={style.intro}>
            <img src="/src/assets/banner2.png" alt="" />
          </div>

          {/* Start Discription */}
          <p className={style.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis est
            aut, rem consequatur quod eos nam incidunt exercitationem
            blanditiis. Harum incidunt delectus quibusdam nam quas ipsam
            pariatur omnis numquam itaque officia. Blanditiis magni explicabo
            dolor dignissimos nobis rerum iusto temporibus illo dolorem
            deserunt, impedit, odit praesentium aperiam obcaecati placeat! Nemo
            dolorem quas vero incidunt reiciendis, qui animi error voluptas
            maxime, excepturi laborum temporibus quibusdam accusantium, deserunt
            accusamus. Aut repellendus consequuntur quisquam nemo.
          </p>

          {/* Our Counter Template */}
          <Counter_template counter_data={counter_data} />
        </div>
      </div>
      {/* Start Video Section */}
      <div className={style.video_section}>
        <img src="/src/assets/modern1.jpg" className={style.poster} alt="" />
        <button onClick={() => set_start_video(true)}>
          <i className="fa-solid fa-play"></i>
        </button>
        {start_video && (
          <Our_video_component
            video_url={
              "https://www.youtube.com/embed/1ap0baidLVo?si=gtVX3jkc-lzWpuDX"
            }
            stop_video={stop_video}
          />
        )}
      </div>

      {/* Start Show Our Team */}
      <div className={style.page_container}>
        <div className={style.our_team_area}>
          <h1 className={style.title}>Meet Our Team</h1>
          <div className={style.members}>
            {our_team.map((user, index) => {
              return (
                <div key={index} className={style.member}>
                  <div className={style.image_box}>
                    <img src={user.img} alt={use.name} />
                  </div>
                  <h3>{user.name}</h3>
                  <p>{user.job_desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_us;
