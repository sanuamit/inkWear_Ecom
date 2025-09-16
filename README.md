# 🛍️ InkWear E-commerce (MERN Stack)

InkWear is a **full-stack custom clothes printing e-commerce web application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with integrations for **Stripe payments**, **Cloudinary image uploads**, **JWT authentication**, and **role-based access control**.

---

## 🚀 Features

- **Authentication & Authorization** (JWT, Protected Routes, Admin/User roles)  
- **Custom Clothes Design Upload** (Cloudinary)  
- **Product Catalog & Management** (Users & Admin)  
- **Shopping Cart & Checkout**  
- **Stripe Payments Integration**  
- **Order Tracking & History**  
- **Admin Dashboard** (Manage products, orders, users, and designs)  
- **Responsive Modern UI** with **React + Vite + TailwindCSS**  

---

## 📂 Project Structure

```bash
inkwear-ecommerce/
│
├── 📂 client/                     # Frontend (React + Vite + Tailwind)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── .env                        # Frontend environment variables
│   │
│   ├── 📂 public/                  # Static assets
│   │   └── favicon.ico
│   │
│   └── 📂 src/
│       ├── main.jsx
│       ├── App.jsx
│       │
│       ├── 📂 assets/              # Images, logos, banners
│       │   ├── logo.png
│       │   └── banner.jpg
│       │
│       ├── 📂 components/          # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── Loader.jsx
│       │   ├── CartItem.jsx
│       │   └── ProductCard.jsx
│       │
│       ├── 📂 pages/               # All page components
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── ProductList.jsx
│       │   ├── ProductDetails.jsx
│       │   ├── Cart.jsx
│       │   ├── Checkout.jsx
│       │   ├── OrderSuccess.jsx
│       │   ├── Profile.jsx
│       │   ├── OrderHistory.jsx
│       │   ├── DesignUploader.jsx
│       │   ├── OrderTracking.jsx
│       │   ├── OrderSummary.jsx
│       │   │
│       │   ├── 📂 admin/           # Admin-only pages
│       │   │   ├── AdminDashboard.jsx
│       │   │   ├── ProductManager.jsx
│       │   │   ├── OrderManager.jsx
│       │   │   └── UserManager.jsx
│       │
│       ├── 📂 features/            # Redux slices & services
│       │   ├── auth/
│       │   │   ├── authSlice.js
│       │   │   └── authService.js
│       │   ├── products/
│       │   │   ├── productSlice.js
│       │   │   └── productService.js
│       │   ├── cart/
│       │   │   ├── cartSlice.js
│       │   │   └── cartService.js
│       │   ├── orders/
│       │   │   ├── orderSlice.js
│       │   │   └── orderService.js
│       │   └── admin/
│       │       ├── adminSlice.js
│       │       └── adminService.js
│       │
│       ├── 📂 redux/               # Store setup
│       │   └── store.js
│       │
│       ├── 📂 utils/               # Helper functions
│       │   ├── formatPrice.js
│       │   └── api.js
│       │
│       └── 📂 routes/
│           └── AppRouter.jsx
│
├── 📂 server/                     # Backend (Node.js + Express + MongoDB + Stripe + Cloudinary)
│   ├── package.json
│   ├── server.js
│   ├── .env                        # Backend environment variables
│   │
│   ├── 📂 config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── 📂 models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Design.js
│   │
│   ├── 📂 routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── 📂 controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── paymentController.js
│   │   ├── orderController.js
│   │   ├── uploadController.js
│   │   └── adminController.js
│   │
│   ├── 📂 middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── 📂 utils/
│   │   ├── generateToken.js
│   │   ├── cloudinaryUpload.js
│   │   └── stripe.js
│   │
│   ├── 📂 scripts/
│   │   ├── seedAdmin.js
│   │   └── seedProducts.js
│   │
│   └── 📂 uploads/                 # Local file uploads (if needed)
│       └── .gitkeep
│
└── README.md

