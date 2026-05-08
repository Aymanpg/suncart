# ☀️ SunCart — Summer Essentials Store

A modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more.

## 🌐 Live URL

🔗 **[https://suncart-z8mw.vercel.app](https://suncart-z8mw.vercel.app)**

## 🎯 Purpose

SunCart is a full-stack web application built as part of the PH Assignment (Category A8 — Jackfruit). It allows users to browse summer products, view detailed information after authentication, manage their profile, and enjoy a smooth shopping experience.

## ✨ Key Features

- 🏠 Beautiful Home Page with animated Hero Banner & Summer Sale highlights
- 🛍️ Product browsing with search, filter by category, and sort options
- 🔒 Protected Product Details page (login required to view)
- 🔁 Redirect back to product after login
- 🔐 Email & Password Authentication with BetterAuth
- 🔑 Google OAuth Login support
- 👤 My Profile page showing user name, photo and email
- ✏️ Update Profile — change name and photo
- 📱 Fully responsive on mobile, tablet, and desktop
- 🎨 Clean & minimal Orange/Yellow summer theme
- 🎞️ Animate.css animations on Hero section
- 🔔 Toast notifications for all actions

## 📦 NPM Packages Used

| Package | Purpose |
|---------|---------|
| `next` | React framework (App Router) |
| `better-auth` | Authentication (email + Google OAuth) |
| `mongodb` | MongoDB database driver |
| `react-hot-toast` | Toast notifications |
| `animate.css` | CSS animations |
| `tailwindcss` | Utility-first CSS styling |
| `@tailwindcss/postcss` | PostCSS plugin for Tailwind v4 |

## 🛠️ Tech Stack

- **Next.js 16** — App Router
- **Tailwind CSS** — Styling
- **DaisyUI** — UI Components
- **BetterAuth** — Authentication
- **MongoDB Atlas** — Database
- **Animate.css** — Animations
- **Vercel** — Deployment

## 🚀 Getting Started Locally

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/suncart.git
cd suncart
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root folder:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js                   # Home page
│   ├── layout.js                 # Root layout
│   ├── globals.css               # Global styles
│   ├── products/
│   │   ├── page.js               # All Products page
│   │   └── [id]/
│   │       └── page.js           # Product Details (protected)
│   ├── login/
│   │   └── page.js               # Login page
│   ├── register/
│   │   └── page.js               # Register page
│   ├── my-profile/
│   │   ├── page.js               # My Profile page
│   │   └── update/
│   │       └── page.js           # Update Profile page
│   └── api/
│       └── auth/
│           └── [...all]/
│               └── route.js      # BetterAuth API handler
├── components/
│   ├── Navbar.jsx                # Responsive Navbar
│   └── Footer.jsx                # Footer
├── lib/
│   ├── auth.js                   # BetterAuth server config
│   └── auth-client.js            # BetterAuth client config
└── data/
    └── products.json             # 24 summer products (static)
```

## 📸 Pages Overview

| Page | Route | Access |
|------|-------|--------|
| Home | `/` | Public |
| All Products | `/products` | Public |
| Product Details | `/products/[id]` | 🔒 Login Required |
| Login | `/login` | Public |
| Register | `/register` | Public |
| My Profile | `/my-profile` | 🔒 Login Required |
| Update Profile | `/my-profile/update` | 🔒 Login Required |

## 👨‍💻 Developer
