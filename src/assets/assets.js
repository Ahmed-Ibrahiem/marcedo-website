import ARB_flag from "./egypt.png";
import amr_flag from "./america.png";
import fra_flag from "./france.png";
import logo_img from "./Group 2.png";
import user_img from "./account.png";
import dress_img from "./dress.png";
import apple_img from "./apple-logo.png";
import t_shirt_img from "./baby-boy-dress-stroke-rounded 1.png";
import electronic_img from "./electronic.png";
import perfume_img from "./perfume.png";
import wrist_Watch from "./wristwatch.png";
import hero_single1_img from "./hero_single1_img.png";
import hero_single2_img from "./hero_single2_img.png";
import hero_single3_img from "./hero_single3_img.png";
import hero_single2_background from "./hero_single2_background.jpg";
import iphone_14 from "./iphone 14.png";
import iphone_14_pro from "./iphone 14pro.png";
import iphone_15 from "./iphone 15.png";
import deals_side_banner1 from "./deals_side_banner1.jpg";
import deals_side_banner2 from "./deals_side_banner2.jpg";
import arrow_up_right_orange from "./right-up-orange.png";
import arrow_up_right_white from "./right-up.png";
import gaming_monitor from "./gaming monitor.png";
import smart_watch from "./products image/smart watch.png";
import brand_one from "./brand_one.png";
import brand_two from "./brand_two.png";
import brand_three1 from "./brand_three1.png";
import brand_three2 from "./brand_three2.png";
import dress_collection from "./dress_collection.png";
import shirt_collection from "./shirt.png";
import sweeter_collection from "./sweeter.png";
import sport_collectoin from "./sport.png";
import t_shirt_collection from "./t-shirt.png";
import blazer_collection from "./blazer.png";
import featur_product from "./feature_product_image.png";
import salling_user1 from "./salling_user1.png";
import display_2 from './display_2.png'
import display_4 from './display_4.png'
import display_6 from './display_6.png'
import display_8 from './display_8.png'

export const countries = ["EGP", "AMR", "FRE"];
export const languages = [
  {
    language_flag: ARB_flag,
    language_name: "ARB",
  },
  {
    language_flag: amr_flag,
    language_name: "AMR",
  },
  {
    language_flag: fra_flag,
    language_name: "FRE",
  },
];

export const display_image = [
  {
    count: 2,
    image: display_2
  },
  {
    count: 4,
    image: display_4
  },
  {
    count: 6 ,
    image: display_6
  },
  {
    count: 8,
    image: display_8
  },
]

export const assets = {
  logo_img,
  ARB_flag,
  amr_flag,
  fra_flag,
  user_img,
  dress_img,
  apple_img,
  t_shirt_img,
  electronic_img,
  perfume_img,
  wrist_Watch,
  iphone_14,
  iphone_14_pro,
  iphone_15,
  deals_side_banner1,
  deals_side_banner2,
  arrow_up_right_orange,
  arrow_up_right_white,
  gaming_monitor,
  smart_watch,
  brand_one,
  brand_two,
  brand_three1,
  brand_three2,
  dress_collection,
  shirt_collection,
  sweeter_collection,
  sport_collectoin,
  t_shirt_collection,
  blazer_collection,
  featur_product,
  salling_user1,
};

export const dresses_brands = ["Nike" ,"Zara" , 'H&M' , "Adidas" , "Tommy Hilfiger" , "Levi's" , "Uniqlo"] 

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

export const popular_categories = [
  {
    category_name: "T-shirt",
    img: t_shirt_img,
    category_page: "/t-shirt",
  },
  {
    category_name: "Apple",
    img: apple_img,
    category_page: "/apple",
  },
  {
    category_name: "Dress",
    img: dress_img,
    category_page: "/dresses",
  },
  {
    category_name: "Wristwatch",
    img: wrist_Watch,
    category_page: "/wristwatch",
  },
  {
    category_name: "Parfum",
    img: perfume_img,
    category_page: "/parfum",
  },
  {
    category_name: "Electronic",
    img: electronic_img,
    category_page: "/electronic",
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

  export const  discount_codes = [
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
  { code: "TRYME5", type: "fixed", value: 5 }
];