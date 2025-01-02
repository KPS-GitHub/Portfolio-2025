// filepath: /c:/Users/kenna/Web Dev/Portfolio Site/portfolio-site/src/functions/useAddRemoveClassInSequence.js
import { useEffect } from 'react';

const useAddRemoveClassInSequence = (elements, className, elementDelay, rerunDelay) => {
  useEffect(() => {
    const bounceElement = (element) => {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
      }, 500); // Duration of the bounce animation
    };

    elements.forEach((element, index) => {
      setTimeout(() => {
        bounceElement(element);
      }, index * elementDelay); // Delay before bouncing the next element
    });

    const interval = setInterval(() => {
      elements.forEach((element, index) => {
        setTimeout(() => {
          bounceElement(element);
        }, index * elementDelay); // Delay before bouncing the next element
      });
    }, rerunDelay); // Restart the animation after rerunDelay

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [elements, className, elementDelay, rerunDelay]);
};

export default useAddRemoveClassInSequence;