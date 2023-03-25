import { IParallax } from "@react-spring/parallax";
import { MutableRefObject, useState } from "react";

export interface Props {
  parallax: MutableRefObject<IParallax>;
}

const Arrow = ({ parallax }: Props) => {
  const [inside, setIsInside] = useState<boolean>(false);
  return (
    <div
      className="rounded-full w-6 h-8 flex justify-center items-center absolute bottom-10 left-1/2"
      onMouseEnter={() => {
        setIsInside(true);
      }}
      onMouseLeave={() => {
        setIsInside(false);
      }}
    >
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={() => {
          parallax.current.scrollTo(2.5);
        }}
      >
        <div className="arrow">
          <span className={` ${inside && "animate-fall"}`}></span>
          {inside && (
            <>
              <span className={` ${inside && "animate-fall"}`}></span>
              <span className={` ${inside && "animate-fall"}`}></span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default Arrow;
