import { MetadataRoute } from 'next';

// Main routes for the site
const routes = [
  '',
  '/destinations',
  '/packages',
  '/about',
  '/contact',
  '/booking',
  '/payment',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.safarnamatravels.fun';
  
  // Create sitemap entries for standard routes
  const routeEntries = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // Return the combined sitemap entries
  return [...routeEntries];
} 