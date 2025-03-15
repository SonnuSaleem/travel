# TravelEase - Travel Agency Website

A modern, responsive travel agency website built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and attractive design with animations using Framer Motion
- **MongoDB Integration**: Backend API routes connected to MongoDB for data storage
- **Booking System**: Functional booking form for travel packages
- **Search Functionality**: Search and filter destinations
- **User-friendly Navigation**: Intuitive navigation with mobile menu
- **Contact Form**: Interactive contact form with validation
- **Newsletter Subscription**: Email subscription functionality

## Tech Stack

- **Frontend**:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Framer Motion (animations)
  - React Icons

- **Backend**:
  - Next.js API Routes
  - MongoDB / Mongoose

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/travel-agency.git
   cd travel-agency
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
travel-agency/
├── public/             # Static assets
├── src/
│   ├── app/            # App router pages
│   ├── components/     # React components
│   ├── data/           # Sample data
│   ├── lib/            # Utility functions
│   ├── models/         # MongoDB models
│   └── types/          # TypeScript types
├── .env.local          # Environment variables (create this file)
├── next.config.ts      # Next.js configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Deployment

This application can be deployed on Vercel, Netlify, or any other hosting platform that supports Next.js.

```bash
npm run build
# or
yarn build
```

## Customization

- Replace the dummy images with your own images
- Update the MongoDB connection string in `.env.local`
- Modify the destination data in `src/data/destinations.ts`
- Customize the colors in `tailwind.config.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Images from [Unsplash](https://unsplash.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
