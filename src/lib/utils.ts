/**
 * Get the base URL for the application
 * This will return the correct URL in both development and production environments
 */
export function getBaseUrl() {
  // Check if NEXT_PUBLIC_SITE_URL is available (should be set in production)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ''); // Remove trailing slash if present
  }
  
  // For Vercel deployments, use the VERCEL_URL environment variable
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Fallback for local development
  return 'http://localhost:3000';
}

/**
 * Get the absolute URL for an API endpoint
 * @param path - The API path (e.g., '/api/newsletter')
 */
export function getApiUrl(path: string) {
  const baseUrl = getBaseUrl();
  const apiPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${apiPath}`;
}

/**
 * Format a date string to a more readable format
 * @param dateString - The date string to format
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format a price number to a currency string
 * @param price - The price to format
 */
export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
} 