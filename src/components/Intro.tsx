import { IParallax } from "@react-spring/parallax";
import { lora } from "lib/fonts/fonts";
import { MutableRefObject } from "react";

export interface Props {
  parallax: MutableRefObject<IParallax>;
}

const Intro = ({ parallax }: Props) => {
  return (
    <>
      <div
        id="intro"
        className="w-full h-full bg-atlas-intro flex flex-col gap-20 text-atlas-gold overflow-hidden items-center relative"
      >
        <button
          className="cursor-pointer  absolute right-20 top-10 w-7 h-7 flex justify-center items-center"
          onClick={() => {
            parallax.current.scrollTo(0);
          }}
        >
          <span className="w-5 h-5 block rotate-45 border-white border-solid border-t-4 border-l-4"></span>
        </button>
        <div className="flex flex-col justify-center items-center gap-8 subpixel-antialiased text-center leading-atlas-heading-sm pt-10 h-full">
          <h1
            className={`font-heading font-semibold md:text-5xl text-3xl leading-atlas-heading  antialiased`}
          >
            Welcome to Atlas
          </h1>
          <p className="2xl:text-2xl text-xl font-medium w-10/12 md:w-1/2 2xl:w-2/5 font-sans">
            Your go-to guide for information about countries around the world! Our website provides
            you with all the essential details you need to know From the capital of the country,
            currency, time zone, weather, population, to its neighboring countries.
          </p>
          <p className="antialiased w-10/12 md:w-3/5 2xl:w-5/12 2xl:text-xl text-lg font-medium font-sans">
            With our user-friendly interface, you can easily search for a specific country or
            explore different regions to find the information you need. Whether you are planning a
            vacation, conducting research, or just curious about the world, Atlas is the perfect
            resource to help you get started.
          </p>
        </div>
      </div>
    </>
  );
};
export default Intro;
