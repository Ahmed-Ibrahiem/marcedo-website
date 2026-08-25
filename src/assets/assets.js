import logo_img from "/assets/images/Group 2.png";
import hero_single1_img from "/assets/images/hero_single1_img.png";
import hero_single2_img from "/assets/images/hero_single2_img.png";
import hero_single3_img from "/assets/images/hero_single3_img.png";
import hero_single2_background from "/assets/images/hero_single2_background.jpg";
import iphone_14 from "/assets/images/iphone 14.png";
import iphone_14_pro from "/assets/images/iphone 14pro.png";
import iphone_15 from "/assets/images/iphone 15.png";
import deals_side_banner1 from "/assets/images/deals_side_banner1.jpg";
import deals_side_banner2 from "/assets/images/deals_side_banner2.jpg";
import gaming_monitor from "/assets/images/gaming monitor.png";
import dress_collection from "/assets/images/dress_collection.png";
import shirt_collection from "/assets/images/shirt.png";
import sweeter_collection from "/assets/images/sweeter.png";
import sport_collectoin from "/assets/images/sport.png";
import t_shirt_collection from "/assets/images/t-shirt.png";
import blazer_collection from "/assets/images/blazer.png";
import featur_product from "/assets/images/feature_product_image.png";
import display_4 from "/assets/images/display_4.png";
import display_6 from "/assets/images/display_6.png";
import display_8 from "/assets/images/display_8.png";

export const display_image = [
  {
    count: 2,
    image: display_4,
  },
  {
    count: 3,
    image: display_6,
  },
  {
    count: 4,
    image: display_8,
  },
];

export const assets = {
  logo_img,
  iphone_14,
  iphone_14_pro,
  iphone_15,
  deals_side_banner1,
  deals_side_banner2,
  gaming_monitor,
  dress_collection,
  shirt_collection,
  sweeter_collection,
  sport_collectoin,
  t_shirt_collection,
  blazer_collection,
  featur_product,
  emptyBox:
    "https://res.cloudinary.com/dsqaber42/image/upload/v1787694240/22dba3b5-f90e-41d3-affd-d7e08864f82f_mlfuho.png",
};

export const swiper_slider_info = [
  {
    img: hero_single1_img,
    background: hero_single2_background,
    title: "iPad mini 2024",
    description: "Mega Power in Mini Size",
    product_id: 1,
  },
  {
    img: hero_single2_img,
    background: hero_single2_background,
    title: "G-Tab G8 2025",
    description: "Smart Power In Your Hands",
    product_id: 2,
  },
  {
    img: hero_single3_img,
    background: hero_single2_background,
    title: "Redmi Pad 2025",
    description: "Entertainment That Lasts",
    product_id: 3,
  },
];

export const deals_data = {
  id: 1,
  name: "Apple iPhone 15",
  storage: "128 GB",
  brand: "Apple",
  os: "iOS 17",
  screenSize: "6.1",
  price: {
    current: 36599,
    old: 40000,
    currency: "EGP",
  },
  promotion: {
    days: 50,
    hours: 9,
    minutes: 32,
    seconds: 10,
  },
  sold: {
    current: 24,
    total: 50,
  },
  variants: [
    {
      color: "black",
      image: iphone_14,
    },
    {
      color: "green",
      image: iphone_15,
    },
    {
      color: "blue",
      image: iphone_14_pro,
    },
  ],
};

export const address_20_shopping_cost = [
  "New Cairo, Cairo",
  "Fifth Settlement, New Cairo",
  "Nasr City, Cairo",
  "Maadi, Cairo",
].map((word) => word.toLowerCase());

export const address_15_shopping_cost = [
  "Heliopolis, Cairo",
  "Zamalek, Cairo",
  "Downtown, Cairo",
  "Madinaty, Cairo",
  "Al Rehab City, Cairo",
].map((word) => word.toLowerCase());

export const discount_codes = [
  { code: "WELCOME10", type: "percentage", value: 10 },
  { code: "SAVE20", type: "percentage", value: 20 },
  { code: "DISCOUNT15", type: "percentage", value: 15 },
  { code: "NEWUSER25", type: "percentage", value: 25 },
  { code: "SPRING30", type: "percentage", value: 30 },
  { code: "RAMADAN50", type: "percentage", value: 50 },
  { code: "FREESHIP", type: "shipping", value: 100 },
  { code: "FLASH40", type: "percentage", value: 40 },
  { code: "MEGADEAL60", type: "percentage", value: 60 },
  { code: "BLACKFRIDAY70", type: "percentage", value: 70 },
  { code: "CYBER80", type: "percentage", value: 80 },
  { code: "VIP100", type: "fixed", value: 100 },
  { code: "STUDENT15", type: "percentage", value: 15 },
  { code: "FIRSTORDER20", type: "percentage", value: 20 },
  { code: "TRYME5", type: "fixed", value: 5 },
];
