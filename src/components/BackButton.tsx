'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

interface BackButtonProps {
  goToHome?: boolean;
  className?: string;
}

const BackButton = ({ goToHome = false, className = '' }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (goToHome) {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors p-2 no-focus-outline ${className}`}
      aria-label={goToHome ? "Go to home page" : "Go back"}
    >
      <FaArrowLeft className="text-lg" />
      <span>{goToHome ? 'Home' : 'Back'}</span>
    </button>
  );
};

export default BackButton; 