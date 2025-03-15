/**
 * Client-side analytics utility for tracking user activity
 */

// Track when a user joins (page load) or leaves (page unload)
export const trackUserActivity = () => {
  // Only run on client side
  if (typeof window === 'undefined') return;

  // Function to notify the server when a user joins
  const notifyUserJoined = async () => {
    try {
      await fetch('/api/analytics/active-users', {
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
      // Use sendBeacon for more reliable delivery during page unload
      if (navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ action: 'leave' })],
          { type: 'application/json' }
        );
        navigator.sendBeacon('/api/analytics/active-users', blob);
      } else {
        // Fallback to fetch if sendBeacon is not available
        await fetch('/api/analytics/active-users', {
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