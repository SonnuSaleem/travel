import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - Phool Nagar Travels',
  description: 'The page you are looking for does not exist. Return to Phool Nagar Travels homepage.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-dark text-light">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <p className="mb-8">
          Please return to the Phool Nagar Travels homepage to continue browsing our travel packages and services.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
} 