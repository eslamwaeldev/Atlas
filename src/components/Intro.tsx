import { inter, lora } from "lib/fonts/fonts";
import Link from "next/link";

const Intro = () => {
  return (
    <>
      <div
        id="intro"
        className="w-full h-full bg-atlas-intro flex flex-col gap-20 text-atlas-gold overflow-hidden items-center"
      >
        <div className="flex flex-col justify-center items-center gap-8 subpixel-antialiased text-center leading-atlas-heading-sm pt-10 h-2/3">
          <h1 className={`${lora.variable} font-semibold text-5xl leading-atlas-heading `}>
            Welcome to Atlas
          </h1>
          <p className="2xl:text-2xl text-xl font-medium w-1/2 2xl:w-2/5">
            Your go-to guide for information about countries around the world! Our website provides
            you with all the essential details you need to know From the capital of the country,
            currency, time zone, weather, population, to its neighboring countries.
          </p>
          <p className="antialiased w-3/5 2xl:w-5/12 2xl:text-xl text-lg font-medium">
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
