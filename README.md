# Marcedo E-Commerce

Marcedo is a full-featured E-Commerce project that originally started as a simple frontend-only application built with HTML, CSS, and JavaScript based on a UI design.

After gaining more experience and building other projects, I decided to rebuild the project from scratch and turn it into my main portfolio project with a more scalable and production-oriented architecture.

The goal is not just to build an online store, but to build a complete E-Commerce system with clean architecture, scalable data design, and a full admin management system.

---

## Tech Stack

### Frontend

- React.js
- TailwindCSS
- Redux Toolkit
- React Router DOM
- Swiper.js

### Backend / Database

- Firebase Authentication
- Firestore Database
- Firebase Realtime Database

---

## Project Goals

This project focuses on building a scalable and maintainable E-Commerce platform with:

- Clean Architecture
- Scalable Data Structure
- Performance Optimization
- Dynamic Product Management
- Admin Dashboard System
- Product Variant Management
- Inventory Tracking
- Order Management
- Reviews System

---

## Current Progress

### Store Front

- [x] Home Page
- [x] Product Details Page
- [x] Product Gallery
- [x] Product Variants UI
- [x] Product Reviews System
- [x] Product Ratings System
- [x] Cart System
- [x] Wishlist System
- [x] Dynamic Filters (category-aware, multi-select, price range)
- [x] Pagination System
- [x] Export Products Feature

---

### Admin Dashboard

- [x] Dashboard Layout
- [x] Products Management Page
- [x] Filters System
- [x] Bulk Actions
- [x] Export Selected Products
- [x] Variant Inventory System
- [ ] Add New Product Form (In Progress)
- [ ] Edit Product
- [ ] Orders Management
- [ ] Users Management
- [ ] Reviews Management

---

## Current Data Architecture

The project went through a complete data restructuring.

Originally, all product data was stored inside a single object, which made the system difficult to scale and manage.

The new structure separates product data into multiple collections:

- products
- product_details
- product_pricing
- product_stock
- product_media
- product_shipping
- product_variants
- product_reviews
- ratings
- brands
- categories

This restructuring improved:

- Performance
- Scalability
- Maintainability
- Data Organization
- Dashboard Management

---

## Challenges & Solutions

### 1. Variant-Level Inventory Management

While building the Admin Dashboard, specifically the Add New Product system, I discovered an important limitation in the original architecture.

The initial variant system supported displaying product options like:

- Colors
- Sizes
- Storage
- Connectivity

But it did not support variant-level inventory management.

Example:

If a product has:

Color:

- Black
- White

Size:

- S
- M
- L

The system needed to be able to answer:

- Is Black + M available?
- How many units of Black + M are in stock?
- Is White + L out of stock?

**Solution:** I redesigned the variant system to treat each color/size combination as an individual stock unit, so inventory is tracked per combination instead of per product. This is now live in the Admin Dashboard and reflected in stock availability across the store front.

---

### 2. Dynamic, Category-Aware Filtering

Each category in the store has a different set of filterable attributes (e.g. Electronics has Storage, Connectivity, and Screen Size, while Clothing has Size and Color). Filter values also live in the `product_variants` collection, separate from the `products` collection.

The first approach queried `product_variants` separately on every category page load, in addition to the `products` and `category` queries. This worked, but meant every page visit paid for an extra round trip to Firestore just to build the filter sidebar.

---

## What I Learned

This project taught me one of the most important lessons in software development:

Data architecture is not a secondary detail.

Every structural decision directly affects:

- Performance
- Scalability
- Feature flexibility
- Maintainability
- System complexity

I also learned to think in terms of trade-offs rather than absolute "right" answers — for example, choosing between normalized data (easier to keep consistent) and denormalized data (faster to read) depending on whether a part of the system is read-heavy or write-heavy.

Building software is not just about writing code. It is about designing systems that can grow and adapt over time.

---

## Next Steps

- Complete Add Product System
- Complete Orders Management
- Complete Users Management
- Complete Reviews Management
- Build Checkout Flow
- Payment Integration
- Analytics Dashboard
- Performance Optimization

---

## Live Demo:

[marcedo-application](https://marcedo-application.netlify.app/)

## Github Repo:

[marcedo-website-repo](https://github.com/Ahmed-Ibrahiem/marcedo-website.git)
