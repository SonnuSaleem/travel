'use client';

import { useEffect, useState } from 'react';

const SaleNotification = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50"
      style={{ position: 'fixed' }}
    >
      <p className="text-black text-center text-xl font-semibold px-4">
        This website is available for sale. Contact owner through contact page of the site. You will get first 2 detailed revisons, completely Free.
      </p>
    </div>
  );
};

export default SaleNotification; 