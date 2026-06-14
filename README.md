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
- [x] Dynamic Filters
- [x] Pagination System
- [x] Export Products Feature

---

### Admin Dashboard

- [x] Dashboard Layout
- [x] Products Management Page
- [x] Filters System
- [x] Bulk Actions
- [x] Export Selected Products
- [ ] Add New Product Form (In Progress)
- [ ] Edit Product
- [ ] Orders Management
- [ ] Users Management
- [ ] Reviews Management
- [ ] Inventory Management

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

## Current Challenge

While building the Admin Dashboard, specifically the Add New Product system, I discovered an important limitation in the current architecture.

The current variant system supports displaying product options like:

- Colors
- Sizes
- Storage
- Connectivity

But it does not fully support variant-level inventory management.

Example:

If a product has:

Color:

- Black
- White

Size:

- S
- M
- L

The system must be able to answer:

- Is Black + M available?
- How many units of Black + M are in stock?
- Is White + L out of stock?

This revealed the need for a more advanced variant inventory system where each combination is treated as an individual stock unit.

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

I learned that building software is not just about writing code.

It is about designing systems that can grow and adapt over time.

---

## Next Steps

- Complete Add Product System
- Build Variant Inventory Logic
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
