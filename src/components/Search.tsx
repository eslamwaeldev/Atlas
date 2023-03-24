import Link from "next/link";

const Search = () => {
  return (
    <>
      <div className="w-full h-full bg-atlas-search flex flex-col gap-52 text-atlas-gold overflow-hidden">
        <div className="pl-16 pr-20 flex justify-between relative mt-2">
          <div className="h-20 w-36 flex items-center">
            <Link href="/" className="w-full ">
              <h1 className="text-5xl leading-atlas-heading">ATLAS</h1>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center"></div>
      </div>
    </>
  );
};
export default Search;
