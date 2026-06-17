import { use, useLayoutEffect, useState } from "react";
import Counter_template from "./components/counter-component/Counter_template";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import Our_video_component from "./components/our-video-component/Our_video_component";
import style from "./About_us.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const About_us = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const our_team = [
    {
      name: "Ahmed Ibrahiem",
      job_desc: "Web Developer",
      img: "/assets/developer.jpg",
    },
    {
      name: "Mahmoud Amara",
      job_desc: "UI/UX Designer",
      img: "/assets/designer.jpg",
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
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            className={style.intro}
          >
            {!imageLoaded && (
              <div style={{ width: "100%", height: "100%" }}>
                <Skeleton width="100%" height="100%" />
              </div>
            )}
            <img
              src="/assets/banner2.png"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
              loading="lazy"
              alt=""
            />
          </motion.div>

          {/* Start Discription */}
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            className={style.text}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis est
            aut, rem consequatur quod eos nam incidunt exercitationem
            blanditiis. Harum incidunt delectus quibusdam nam quas ipsam
            pariatur omnis numquam itaque officia. Blanditiis magni explicabo
            dolor dignissimos nobis rerum iusto temporibus illo dolorem
            deserunt, impedit, odit praesentium aperiam obcaecati placeat! Nemo
            dolorem quas vero incidunt reiciendis, qui animi error voluptas
            maxime, excepturi laborum temporibus quibusdam accusantium, deserunt
            accusamus. Aut repellendus consequuntur quisquam nemo.
          </motion.p>

          {/* Our Counter Template */}
          <Counter_template counter_data={counter_data} />
        </div>
      </div>
      {/* Start Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3, once: true }}
        className={style.video_section}
      >
        <img src="/assets/modern1.jpg" className={style.poster} alt="" loading="lazy" />
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
      </motion.div>

      {/* Start Show Our Team */}
      <div className={style.page_container}>
        <div className={style.our_team_area}>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.8, once: true }}
            className={style.title}
          >
            Meet Our Team
          </motion.h1>
          <div className={style.members}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3, once: true }}
              className={style.member}
            >
              <div className={style.image_box}>
                <img src={our_team[0].img} alt={our_team[0].name} loading="lazy"/>
              </div>
              <h3>{our_team[0].name}</h3>
              <p>{our_team[0].job_desc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3, once: true }}
              className={style.member}
            >
              <div className={style.image_box}>
                <img src={our_team[1].img} alt={our_team[1].name} loading="lazy" />
              </div>
              <h3>{our_team[1].name}</h3>
              <p>{our_team[1].job_desc}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_us;
