import "./Footer.css";
import { assets } from "../../../assets/assets.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
      viewport={{ amount: 0.2, once: true }}
    >
      <div className="head">
        <div className="part">
          <i className="fa-solid fa-truck"></i>
          <span>FREE SHIPPING OVER</span>
        </div>
        <div className="part">
          <i className="fa-solid fa-rotate-right"></i>
          <span>30 DAY MONEY BACK</span>
        </div>
        <div className="part">
          <i className="fa-solid fa-shield"></i>
          <span>100% SECURE PAYMENT</span>
        </div>
        <div className="part">
          <i className="fa-solid fa-message"></i>
          <span>24/7 DEDICATED SUPPORT</span>
        </div>
      </div>
      <div className="foot">
        <div className="logo-container">
          <div className="logo">
            <img src={assets.logo_img} alt="" />
            <p>
              Mercado - <span>Online Shopping</span>
            </p>
          </div>
          <p>
            Mercado is your go-to destination for online shopping, offering a
            wide range of products at the best prices with fast doorstep
            delivery. Enjoy a seamless and secure shopping experience!{" "}
          </p>
        </div>
        <div className="links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link to={"/Home"}>Home</Link>
            </li>
            <li>
              <Link to={"/Shop"}>Shop</Link>
            </li>
            <li>
              <Link to={"/contact-us"}>Contact</Link>
            </li>
            <li>
              <Link to={"/about-us"}>About</Link>
            </li>
          </ul>
        </div>
        <div className="contact">
          <h2>Contact Us</h2>
          <ul>
            <li>
              <a href="##">
                <i className="fa-solid fa-location-dot"></i>
                <span>Cairo , Egypt</span>
              </a>
            </li>
            <li>
              <a href="tel:01011560550">
                <i className="fa-brands fa-whatsapp"></i>
                <span>+20 101 156 0550</span>
              </a>
            </li>
            <li>
              <a href="mailto:ahmedebrhihem935@gmail.com">
                <i className="fa-solid fa-envelope"></i>
                <span>ahmedebrhihem935@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="subscrie">
          <h2>For Every Update</h2>
          <form>
            <input type="email" placeholder="Enter Your Email" />
            <input type="button" value="Subscrie" />
          </form>
          <div className="social-media">
            <a href="http://www.twitter.com">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="http://www.faceabook.com">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="http://www.instagram.com">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <p> &copy; COPYright 2021. All rights reserved </p>
    </motion.footer>
  );
};

export default Footer;
