import Image from 'next/image';
import React, { useEffect } from 'react';
import a from "../assets/image-track/a.png";
import b from "../assets/image-track/b.png";
import c from "../assets/image-track/c.png";
import d from "../assets/image-track/d.png";
import e from "../assets/image-track/e.png";
import f from "../assets/image-track/f.png";
import g from "../assets/image-track/g.png";
import h from "../assets/image-track/h.jpg";

const Hero = () => {
  const [mouseDownAt, setMouseDownAt] = React.useState<number | null>(null);
  const [prevPercentage, setPrevPercentage] = React.useState<number>(0);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  let nextPercentage = 0;
  let nextPercentageUnconstrained = 0;
  const autoAnimationDuration = 1000;

  if (trackRef.current) {
    (trackRef.current as HTMLDivElement).dataset.prevPercentage = "0";
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDownAt(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseDownAt === null) return;

    const mouseDelta = parseFloat(mouseDownAt.toString()) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;

    nextPercentageUnconstrained = prevPercentage + percentage;
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    if (trackRef.current) {
      const datasetMouseDownAt = (trackRef.current as HTMLDivElement).dataset.mouseDownAt;
      if (datasetMouseDownAt === undefined) return;

      const parsedMouseDownAt = parseFloat(datasetMouseDownAt);
      if (!isNaN(parsedMouseDownAt)) {
        (trackRef.current as HTMLDivElement).animate(
          {
            transform: `translate(${nextPercentage}%, -50%)`,
          },
          {
            duration: 1500,
            fill: 'forwards',
          }
        );

        const trackImages = (trackRef.current as HTMLDivElement).querySelectorAll('.trackImage');
        trackImages.forEach((image) => {
          (image as HTMLElement).animate(
            {
              objectPosition: `${100 + nextPercentage}% center`,
            },
            {
              duration: 1200,
              fill: 'forwards',
            }
          );
        });

        (trackRef.current as HTMLDivElement).dataset.prevPercentage = nextPercentage.toString();
      }
    }
  };

  const onMouseUp = () => {
    // Reset the data-mouse-down-at attribute to "0" when the mouse button is released
    if (trackRef.current) {
      (trackRef.current as HTMLDivElement).dataset.mouseDownAt = "0";
      (trackRef.current as HTMLDivElement).dataset.prevPercentage = (trackRef.current as HTMLDivElement).dataset.percentage;
      setPrevPercentage(nextPercentage);
      console.log("prev ", (trackRef.current as HTMLDivElement).dataset);
    }
  };

  const startAutoAnimation = () => {
    let autoAnimationDirection = 1; // 1 for increasing, -1 for decreasing
    setInterval(() => {
      const currentPercentageString = (trackRef.current as HTMLDivElement).dataset.prevPercentage;

      if (currentPercentageString !== undefined) {
        const currentPercentage = parseFloat(currentPercentageString);
        if (!isNaN(currentPercentage)) {
          let nextPercentage = currentPercentage + autoAnimationDirection;

          if (nextPercentage >= 0) {
            nextPercentage = 0;
            autoAnimationDirection = -autoAnimationDirection;
          } else if (nextPercentage <= -100) {
            nextPercentage = -100;
            autoAnimationDirection = -autoAnimationDirection;
          }

          if (trackRef.current) {
            (trackRef.current as HTMLDivElement).animate(
              {
                transform: `translate(${nextPercentage}%, -50%)`,
              },
              {
                duration: autoAnimationDuration,
                fill: 'forwards',
              }
            );

            const trackImages = (trackRef.current as HTMLDivElement).querySelectorAll('.trackImage');
            trackImages.forEach((image) => {
              (image as HTMLElement).animate(
                {
                  objectPosition: `${100 + nextPercentage}% center`,
                },
                {
                  duration: 1200,
                  fill: 'forwards',
                }
              );
            });

            (trackRef.current as HTMLDivElement).dataset.prevPercentage = nextPercentage.toString();
          }
        }
      }
    }, autoAnimationDuration);
  };

  useEffect(() => {
    // Start the automatic animation loop when the component mounts
    startAutoAnimation();
  }, []);

  return (
    <>
      <div className="bg-none w-full h-screen overflow-hidden m-0 flex flex-col  items-center text-white relative">
        <div className="mt-24 text-center">
          <h1 className="text-5xl uppercase magic">
            <span className="magic-text font-bold">E-State Ledger</span>
          </h1>
          <p className="text-2xl capitalize">Bridging the Gap between Real State and Blockchain</p>
        </div>
        <div
          id="image-track"
          className="overflow-hidden"
          data-mouse-down-at={mouseDownAt}
          data-prev-percentage={prevPercentage}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={onMouseUp}
          ref={trackRef}
        >
                      <Image src={a} alt="Image A" className="trackImage" draggable="false" />
        <Image src={b} alt="Image A" className="trackImage" draggable="false" />
        <Image src={c} alt="Image A" className="trackImage" draggable="false" />
        <Image src={d} alt="Image A" className="trackImage" draggable="false" />
        <Image src={e} alt="Image A" className="trackImage" draggable="false" />
        <Image src={f} alt="Image A" className="trackImage" draggable="false" />
        <Image src={g} alt="Image A" className="trackImage" draggable="false" />
        <Image src={h} alt="Image A" className="trackImage" draggable="false" />
        </div>
      </div>
    </>
  );
};

export default Hero;
