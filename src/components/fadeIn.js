import React, { useEffect, useState } from 'react';

const FadeIn = ({ children, delay = 0, duration = 500 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // note: the classes used on the wrapper div are Tailwind CSS classes
  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDuration: `${duration}ms`, width: '100%' }}
    >
      {children}
    </div>
  );
};

export default FadeIn;