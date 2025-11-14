# 🏡 Airbnb Clone - Property Rental Platform

![App Preview](https://imgix.cosmicjs.com/492edd80-c1a8-11f0-a34a-efbcf979242c-photo-1520250497591-112f2f40a3f4-1763158897195.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern property rental platform built with Next.js 16 and Cosmic CMS. Browse vacation rentals, explore host profiles, and read authentic guest reviews.

## ✨ Features

- 🏠 **Property Listings** - Browse beautiful vacation rentals with detailed information
- 📸 **Photo Galleries** - High-quality property images with responsive layouts
- 👤 **Host Profiles** - Learn about property hosts and their experience
- ⭐ **Guest Reviews** - Read authentic feedback from previous guests
- 🔍 **Property Details** - View amenities, pricing, and location information
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Fast Performance** - Server-side rendering with Next.js 16
- 🎨 **Modern UI** - Clean, Airbnb-inspired design with smooth interactions

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6917aaddd08bae0bc234bd56&clone_repository=6917af5fd08bae0bc234bd79)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create an arbnb clone"

### Code Generation Prompt

> "Based on the content model I created for 'Build an airbnb clone', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **CMS**: Cosmic CMS
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Runtime**: Bun
- **SDK**: @cosmicjs/sdk v1.5.6

## 🏁 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with the Airbnb Clone bucket

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd airbnb-clone
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Listings

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: listings } = await cosmic.objects
  .find({ type: 'listings' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Listing with Reviews

```typescript
const listing = await cosmic.objects
  .findOne({ type: 'listings', slug: 'mountain-cabin-retreat' })
  .depth(1)

const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.listing': listing.id 
  })
  .depth(1)
```

### Fetching Host with Their Listings

```typescript
const host = await cosmic.objects
  .findOne({ type: 'hosts', slug: 'sarah-johnson' })
  .depth(1)

const { objects: hostListings } = await cosmic.objects
  .find({ 
    type: 'listings',
    'metadata.host': host.id 
  })
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic CMS to manage all content. The content model includes:

### Object Types

1. **Listings** (📍)
   - Property information and photos
   - Pricing and availability
   - Amenities and property details
   - Connected to Hosts

2. **Hosts** (👤)
   - Host profiles and bios
   - Profile photos
   - Member since and response rates

3. **Reviews** (⭐)
   - Guest feedback and ratings
   - Review dates and comments
   - Connected to Listings

All content is fetched server-side for optimal performance and SEO.

## 🚀 Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Connect your repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Deploy!

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

<!-- README_END -->