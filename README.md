# ProductSale - E-Commerce Website

A modern, full-featured e-commerce website built with Next.js, TypeScript, and Tailwind CSS. This platform allows you to sell sports shoes, mobiles, laptops, and mobile accessories with a clean, professional design.

## Features

### Customer-Facing Features
- **Advanced Landing Page**: Beautiful hero section with gradient design
- **Product Categories**: Easy navigation by category (Sports Shoes, Mobiles, Laptops, Accessories)
- **Product Listing**: Browse all products with search and filter functionality
- **Product Details**: Detailed product pages with images and information
- **Special Offers**: Display active sales and promotional offers
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Admin Dashboard Features
- **Product Management**: 
  - Add new products
  - Edit existing products
  - Delete products
  - View all products in a table format
  - Set featured products
  - Manage stock levels

- **Offers Management**:
  - Create promotional offers
  - Set discount percentages
  - Configure start and end dates
  - Activate/deactivate offers

- **Activity Monitoring**:
  - Real-time activity log
  - Track all system changes
  - View product additions, updates, and offer creations
  - Timestamped activity history

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── page.tsx        # Admin dashboard home
│   │   ├── products/       # Product management
│   │   ├── offers/         # Offer management
│   │   └── activities/     # Activity log
│   ├── products/           # Customer product pages
│   │   ├── page.tsx        # Product listing
│   │   └── [id]/           # Product detail pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── CategorySection.tsx
│   ├── FeaturedProducts.tsx
│   └── OffersBanner.tsx
├── lib/
│   └── store.ts            # Zustand state management
├── types/
│   └── index.ts            # TypeScript type definitions
└── package.json
```

## Data Storage

The application uses **localStorage** to persist data in the browser. All products, offers, and activities are stored locally and will persist across page refreshes.

## Usage Guide

### Adding Products

1. Navigate to Admin Dashboard → Products
2. Click "Add Product"
3. Fill in product details:
   - Name, Description
   - Price and Original Price (for discounts)
   - Image URL
   - Category
   - Stock quantity
   - Featured status
4. Click "Add Product"

### Creating Offers

1. Navigate to Admin Dashboard → Offers
2. Click "Create Offer"
3. Enter offer details:
   - Title and Description
   - Discount percentage
   - Start and End dates
   - Active status
4. Click "Create Offer"

### Viewing Activities

1. Navigate to Admin Dashboard → Activities
2. View all system activities with timestamps
3. Activities are automatically logged when:
   - Products are added/updated/deleted
   - Offers are created/updated/deleted

## Customization

### Adding New Categories

Edit the categories array in `components/CategorySection.tsx` and `app/admin/products/page.tsx`.

### Styling

All styles use Tailwind CSS. Modify colors, spacing, and design in component files or update `tailwind.config.ts` for global theme changes.

### Product Images

Currently using Unsplash images. Replace image URLs with your own product images.

## Deployment

### Deploy to Netlify (Recommended)

The easiest way to deploy is via GitHub:

1. **Push your code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Import your repository
   - Click "Deploy"
   - Done! Your site is live in ~3 minutes

**For detailed step-by-step instructions**, see [DEPLOY.md](./DEPLOY.md)

### Important Notes

- ⚠️ **cPanel/GoDaddy shared hosting does NOT support Next.js** (needs Node.js)
- ✅ **Netlify** is free and perfect for Next.js
- ✅ You can use your GoDaddy domain with Netlify
- ✅ Every GitHub push auto-deploys your site

## Future Enhancements

Potential features to add:
- User authentication
- Payment integration
- Order management
- Product reviews and ratings
- Backend API integration
- Database storage

## License

This project is open source and available for personal and commercial use.

---

Built with ❤️ using Next.js and Tailwind CSS

