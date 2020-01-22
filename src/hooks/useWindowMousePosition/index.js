import { useState, useEffect } from 'react';

function useWindowMousePosition() {
  const [WindowMousePosition, setWindowMousePosition] = useState({
    x: null,
    y: null,
  });

  function handleMouseMove(e) {
    setWindowMousePosition({
      x: e.pageX,
      y: e.pageY,
    });
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return WindowMousePosition;
}

export default useWindowMousePosition;
