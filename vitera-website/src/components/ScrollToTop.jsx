import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return createPortal(
    <button
      className="scroll-to-top"
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Back to top"
    >
      ↑
    </button>,
    document.body
  );
};

export default ScrollToTopButton;
