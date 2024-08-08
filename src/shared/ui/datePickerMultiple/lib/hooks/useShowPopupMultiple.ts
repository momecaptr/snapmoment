import { useEffect, useRef, useState } from 'react';

export const useShowPopupMultiple = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showPopup]);

  const handleInputClick = () => {
    setShowPopup(true);
  };

  return {
    elementRef,
    handleInputClick,
    setShowPopup,
    showPopup
  };
};
