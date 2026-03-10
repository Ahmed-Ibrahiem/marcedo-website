# Marcedo - E-Commerce Website

Marcedo is a fully responsive e-commerce web application built with React and Vite. It includes a complete shopping experience from browsing products to checkout.

---

## Tech Stack

- React 19
- Vite 7
- React Router DOM v7
- Axios
- React Hook Form + Yup
- Swiper.js
- React Toastify

---

## Features

- Home page with hero banners, best sellers, deals, brands, and testimonials
- Product listing with advanced filters (brand, price, color, size, availability)
- Dresses collection with brand-specific filtering
- Product detail page with image gallery, reviews, and recommendations
- Shopping cart with quantity control and price calculation
- Wishlist to save favorite products
- Full checkout flow with address, delivery options, and credit card form
- User authentication (login / register) with form validation
- Real-time search overlay
- Multi-language and multi-country support
- Order success confirmation page
- Contact page and About us page
- Fully responsive design with mobile navbar

---

## Project Structure

```
src/
├── assets/         # Images, icons, and brand assets
├── Components/     # 30+ reusable UI components
├── Pages/          # Application pages and routes
├── Context/        # Global state management (15+ context providers)
├── Hooks/          # Custom React hooks
└── server/         # Data fetching and localStorage utilities
```

---

## Pages

| Route            | Description                        |
| ---------------- | ---------------------------------- |
| `/`              | Home page                          |
| `/categories`    | Products grid with sidebar filters |
| `/products`      | All products                       |
| `/dresses`       | Dresses collection                 |
| `/product/:id`   | Product detail page                |
| `/wishlist`      | Saved items                        |
| `/checkout`      | Checkout and payment               |
| `/order-success` | Order confirmation                 |
| `/about`         | About us                           |
| `/contact`       | Contact form                       |

---

## Getting Started

### Requirements

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/marcedo-website.git

# Go to the project folder
cd marcedo-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will run at `http://localhost:5173`

### Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```
