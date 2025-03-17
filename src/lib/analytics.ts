/**
 * Client-side analytics utility for tracking user activity
 */

// Import the getApiUrl function
import { getApiUrl } from './utils';

// Track when a user joins (page load) or leaves (page unload)
export const trackUserActivity = () => {
  // Only run on client side
  if (typeof window === 'undefined') return;

  // Function to notify the server when a user joins
  const notifyUserJoined = async () => {
    try {
      const apiUrl = getApiUrl('/api/analytics/active-users');
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'join' }),
      });
    } catch (error) {
      console.error('Error tracking user join:', error);
    }
  };

  // Function to notify the server when a user leaves
  const notifyUserLeft = async () => {
    try {
      const apiUrl = getApiUrl('/api/analytics/active-users');
      // Use sendBeacon for more reliable delivery during page unload
      if (navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ action: 'leave' })],
          { type: 'application/json' }
        );
        navigator.sendBeacon(apiUrl, blob);
      } else {
        // Fallback to fetch if sendBeacon is not available
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'leave' }),
          keepalive: true, // Attempt to keep the request alive even as the page unloads
        });
      }
    } catch (error) {
      console.error('Error tracking user leave:', error);
    }
  };

  // Track user joining
  notifyUserJoined();

  // Track user leaving
  window.addEventListener('beforeunload', notifyUserLeft);

  // Return cleanup function
  return () => {
    window.removeEventListener('beforeunload', notifyUserLeft);
  };
};

// Track active users
export async function trackActiveUser() {
  try {
    // Get the current page URL
    const currentPage = window.location.pathname;
    
    // Get the referrer if available
    const referrer = document.referrer || 'direct';
    
    // Get the user agent
    const userAgent = navigator.userAgent;
    
    // Use the dynamic API URL
    const apiUrl = getApiUrl('/api/analytics/active-users');
    
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: currentPage,
        referrer,
        userAgent,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Silently fail to not disrupt user experience
    console.error('Failed to track active user:', error);
  }
}

// Track page views
export async function trackPageView(page: string) {
  try {
    // Use the dynamic API URL
    const apiUrl = getApiUrl('/api/analytics/active-users');
    
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        timestamp: new Date().toISOString(),
        type: 'pageview',
      }),
    });
  } catch (error) {
    // Silently fail to not disrupt user experience
    console.error('Failed to track page view:', error);
  }
} 