import { IParallax } from "@react-spring/parallax";
import Link from "next/link";
import { MutableRefObject } from "react";
import SearchBox from "./SearchBox";

export interface Props {
  parallax: MutableRefObject<IParallax>;
}

const Search = ({ parallax }: Props) => {
  return (
    <>
      <div className="w-full h-full bg-atlas-search flex flex-col gap-52 text-atlas-gold overflow-hidden relative">
        <div className="pl-16 pr-20 flex justify-between relative mt-2">
          <div className="h-20 w-36 flex items-center">
            <button
              className="w-full "
              onClick={() => {
                parallax.current.scrollTo(0);
              }}
            >
              <h1 className="text-5xl leading-atlas-heading">ATLAS</h1>
            </button>
          </div>
          <button
            className="cursor-pointer  absolute right-20 top-10 w-7 h-7 flex justify-center items-center"
            onClick={() => {
              parallax.current.scrollTo(0);
            }}
          >
            <span className="w-5 h-5 block rotate-45 border-white border-solid border-t-4 border-l-4"></span>
          </button>
        </div>
        <div className="flex justify-center items-center w-full h-full ">
          <SearchBox />
        </div>
      </div>
    </>
  );
};
export default Search;
