import React, { useEffect } from 'react';

const GlowingBlob = () => {
  useEffect(() => {
    const blob = document.getElementById("blob") as HTMLElement;

    if (blob) {
      const handlePointerMove = (event: PointerEvent) => {
        const { clientX, clientY } = event;

        blob.animate(
          {
            left: `${clientX}px`,
            top: `${clientY}px`,
          },
          { duration: 3000, fill: "forwards" }
        );
      };

      window.addEventListener("pointermove", handlePointerMove);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, []);

  return (
    <div id="blob"></div>
  );
};

export default GlowingBlob;
