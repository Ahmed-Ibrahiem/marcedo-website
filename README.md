# Marcedo E-Commerce

Marcedo is a full-featured E-Commerce project that originally started as a simple frontend-only application built with HTML, CSS, and JavaScript based on a UI design.

After gaining more experience and building other projects, I decided to rebuild the project from scratch and turn it into my main portfolio project with a more scalable and production-oriented architecture.

The goal is not just to build an online store, but to build a complete E-Commerce system with clean architecture, scalable data design, and a full admin management system.

---

## Tech Stack

### Frontend

- React.js
- TailwindCSS
- React Router DOM
- Swiper.js
- react-icons

### Backend / Database

- Firebase Authentication
- Firestore Database
- Firebase Firestore

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
- [x] Dynamic Variant Availability
- [x] Product Reviews System
- [x] Product Ratings System
- [x] Cart System
- [x] Wishlist System
- [x] Dynamic Filters (category-aware, multi-select, price range)
- [x] Pagination System
- [x] Export Products Feature
- [x] Responsive UI

---

### Authentication

- [x] Firebase Authentication
- [x] User Registration
- [x] User Login
- [x] Authentication State Management

---

### Admin Dashboard

- [x] Dashboard Layout
- [x] Products Management Page
- [x] Product Filters
- [x] Bulk Actions
- [x] Export Selected Products
- [x] Add New Product Flow
- [x] Edit Product
- [x] Product Variants Management
- [x] Variant-Level Inventory
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

### Product Variants

Product options and variant inventory are handled separately.

A product can define multiple attributes such as:

- Color
- Size
- Storage
- Connectivity

Each valid combination of options is represented as an individual variant with its own:

- Variant ID
- Selected attributes
- Price
- Stock
- SKU
- Availability

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

Each category has a different set of filterable attributes (e.g. Electronics has Storage and Connectivity, Clothing has Size and Color), and filter values live in a separate `product_variants` collection.

**Solution:** Kept the data normalized and solved the N+1 query risk by batching variant requests with Firestore's `in` queries (chunked by 30) fetched in parallel. The filtering logic itself is fully dynamic via `Object.entries()`, so new filter attributes require no code changes.

_Full reasoning behind this decision: see [DEVLOG.md](./DEVLOG.md)._

---

### 3. Designing a Scalable Product Creation Flow

As the product architecture became more complex, the Admin Dashboard needed a structured way to create products without exposing all fields at once.

The product creation process was divided into multiple steps, each responsible for a specific part of the product configuration.

This made the form easier to manage while keeping the resulting data structure consistent with the database architecture.

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

## Architecture Decisions

### Normalized Product Architecture

Product-related data is separated into dedicated collections instead of storing all product information inside a single document.

This makes the system easier to:

- Maintain
- Query
- Update
- Scale
- Manage through the Admin Dashboard

### Variant-Based Inventory

Products with multiple options use individual variants to represent valid combinations.

For example:

Color: Black  
Size: M

is treated as a distinct variant from:

Color: Black  
Size: L

Each variant can have its own stock, SKU, price, and availability.

### Category-Aware Attributes

Product attributes are determined by the deepest selected category.

The system dynamically loads the attributes associated with that category, while also allowing product-specific attributes when needed.

This keeps filtering and product configuration flexible without hardcoding attributes into the product model.

---

## Product Management Flow

The Admin Dashboard provides a multi-step product creation flow:

1. Basic Information
2. Categories & Product Properties
3. Variants & Inventory
4. Pricing, Inventory & Shipping
5. Review & Publish

The flow is designed to keep product configuration structured and prevent invalid or incomplete product data from being published.

---

## Next Steps

### Admin Dashboard

- [ ] Orders Management
- [ ] Users Management
- [ ] Reviews Management

### Store

- [ ] Checkout Flow
- [ ] Order Creation
- [ ] Order Tracking

### Advanced Features

- [ ] Payment Integration
- [ ] Analytics Dashboard
- [ ] Performance Optimization

---

## Live Demo:

[marcedo-application](https://marcedo-application.netlify.app/)

## Github Repo:

[marcedo-website-repo](https://github.com/Ahmed-Ibrahiem/marcedo-website.git)
