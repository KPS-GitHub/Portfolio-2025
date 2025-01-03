import { useEffect } from 'react';

const useAddRemoveClassAnimations = (elements, className, startDelay, elementDelay, rerunDelay) => {
  useEffect(() => {
    const bounceElement = (element) => {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
      }, 500); // Duration of the bounce animation
    };

    const startAnimation = () => {
      elements.forEach((element, index) => {
        setTimeout(() => {
          bounceElement(element);
        }, index * elementDelay); // Delay before bouncing the next element
      });
    };

    const startTimeout = setTimeout(() => {
      startAnimation();
      const interval = setInterval(startAnimation, rerunDelay); // Restart the animation after rerunDelay

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, startDelay); // Initial start delay

    return () => clearTimeout(startTimeout); // Cleanup start timeout on component unmount
  }, [elements, className, startDelay, elementDelay, rerunDelay]);
};

export default useAddRemoveClassAnimations;