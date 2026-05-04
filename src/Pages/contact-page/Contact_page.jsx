import { useLayoutEffect } from "react";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import style from "./Contact_page.module.css";
import { motion } from "framer-motion";

const Contact_page = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="contact_area">
      <div className="container">
        <Our_banner
          page_data={{
            title: "Contact Us",
          }}
        />
        <div className={style.contact_wrap}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { ease: "linear", duration: 0.5 },
            }}
            viewport={{ amount: 0.2, once: true }}
            className={style.form_contact}
          >
            <h1 className={style.title}>Ask Us Anything</h1>
            <p className={style.desc}>
              Have a question or comment? Use the form below to send us a
              message or contact us by mail at:
            </p>
            <form onSubmit={(e) => e.preventDefault()} className={style.form}>
              <div className={style.field}>
                <label htmlFor="name">Your Name*</label>
                <input type="text" id="name" />
              </div>
              <div className={style.field}>
                <label htmlFor="email">Your Email*</label>
                <input type="text" id="email" />
              </div>
              <div className={style.field}>
                <label htmlFor="phone">Your Phone Number*</label>
                <input type="text" id="phone" />
              </div>
              <div className={style.field}>
                <label htmlFor="email">Your Message*</label>
                <textarea type="text" id="email" />
              </div>
              <button>Submit Now</button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { ease: "linear", duration: 0.5 },
            }}
            viewport={{ amount: 0.2, once: true }}
            className={style.contact_info}
          >
            <h1 className={style.title}>Get In Touch!</h1>
            <p className={style.desc}>
              We'd love to hear from you - please use the form to send us your
              message or ideas. <br />
              Or simply pop in for a cup of fresh tea and a cookie:
            </p>
            <ul className={style.info}>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <p>Cairo , Egypt</p>
              </li>
              <li>
                <i className="fa-regular fa-envelope"></i>
                <p>ahmedebrhihem935@gmail.com</p>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <p>+20 101 156 0550</p>
              </li>
              <li>
                <i className="fa-regular fa-clock"></i>
                <p>Open Time: 8:00AM - 6:00PM</p>
              </li>
            </ul>
            <div className={style.social_media}>
              <a href="##">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="##">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="##">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="##">
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a href="##">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3, once: true }}
        className={style.map}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13737.185997412802!2d31.0797021016437!3d30.597399114533022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7d097745e2f7b%3A0x39ff2bf9d14bb528!2z2KfZhNiv2KjYp9mK2KjYqdiMINin2YTYr9io2KfYqNmK2KnYjCDZhdix2YPYsiDYqNix2YPYqSDYp9mE2LPYqNi52Iwg2YXYrdin2YHYuNipINin2YTZhdmG2YjZgdmK2Kk!5e0!3m2!1sar!2seg!4v1769699654080!5m2!1sar!2seg"
          width="100%"
          height="500"
          style={{ border: "none" }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Contact_page;
