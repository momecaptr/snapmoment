import { useRef, useState } from 'react';

export const useShowPopup = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleDocumentClick = (event: MouseEvent) => {
    if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
      setShowPopup(false);
      document.removeEventListener('mousedown', handleDocumentClick);
    }
  };

  const handleInputClick = () => {
    setShowPopup(true);
    document.addEventListener('mousedown', handleDocumentClick);
  };

  return {
    elementRef,
    handleInputClick,
    setShowPopup,
    showPopup
  };
};
