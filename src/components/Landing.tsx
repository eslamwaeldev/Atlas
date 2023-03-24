import { IParallax } from "@react-spring/parallax";
import { lora } from "lib/fonts/fonts";
import Link from "next/link";
import { MutableRefObject } from "react";

export interface Props {
  parallax: MutableRefObject<IParallax>;
}

const Landing = ({ parallax }: Props) => {
  return (
    <>
      <div
        className={`${lora.variable} font-normal h-full w-full text-atlas-gold bg-atlas-world bg-cover bg-no-repeat bg-center bg-blend-lighten overflow-hidden`}
      >
        <div className="h-20 w-full flex gap-72 2xl:gap-[40rem] justify-center items-center relative mt-2">
          <div className="w-36 flex items-center absolute left-16">
            <Link href="/" className="w-full ">
              <h1 className="text-5xl leading-atlas-heading">ATLAS</h1>
            </Link>
          </div>
          <div className="flex items-center gap-20 text-2xl leading-atlas-heading-sm ">
            <div className="flex items-center h-8 w-20 hover:underline hover:text-hover ">
              <button
                onClick={() => {
                  parallax.current.scrollTo(1);
                }}
              >
                Intro
              </button>
            </div>
            <div className="flex items-center h-8 w-20 hover:underline hover:text-hover ">
              <button
                onClick={() => {
                  parallax.current.scrollTo(2);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
