import { IParallax, ParallaxLayer } from "@react-spring/parallax";
import { lora } from "lib/fonts/fonts";
import Link from "next/link";
import { MutableRefObject } from "react";
import Arrow from "./Arrow";

export interface Props {
  parallax: MutableRefObject<IParallax>;
}

const Landing = ({ parallax }: Props) => {
  return (
    <>
      <div
        className={`${lora.variable} font-normal h-full w-full text-atlas-gold bg-atlas-world bg-cover bg-no-repeat bg-center bg-blend-lighten overflow-hidden relative`}
      >
        <div className="h-20 w-full flex gap-72 2xl:gap-[40rem] justify-center items-center relative mt-2">
          <div className="w-36 flex items-center absolute left-16">
            <Link href="/" className="w-full ">
              <h1 className="text-5xl leading-atlas-heading">ATLAS</h1>
            </Link>
          </div>
          <ParallaxLayer speed={2.5} style={{ height: "100%" }}>
            <div
              className={`flex items-center gap-20 justify-center text-2xl leading-atlas-heading-sm h-full`}
            >
              <div className="flex items-center h-8 w-20 hover:underline hover:text-hover ">
                <button
                  onClick={() => {
                    parallax.current.scrollTo(1.425);
                  }}
                >
                  Intro
                </button>
              </div>
              <div className="flex items-center h-8 w-20 hover:underline hover:text-hover ">
                <button
                  onClick={() => {
                    parallax.current.scrollTo(2.5);
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </ParallaxLayer>
        </div>
        <Arrow parallax={parallax} />
      </div>
    </>
  );
};
export default Landing;
