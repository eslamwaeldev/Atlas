import { Country, CountryImages, Time, Weather } from "@/schema";
import { useImmediateInterval } from "@refolded/hooks";
import { weatherFilter } from "lib/filters";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type Props = {
  filteredCountryData: Country;
  weather: Weather;
  countryImages: CountryImages;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  let country: string;

  if (
    params?.country === "israel" ||
    params?.country === "Israel" ||
    params?.country === "isr" ||
    params?.country === "ISR"
  ) {
    country = "Palestine";
  } else {
    country = params?.country as string;
  }
  console.log(country);
  const fetchCountry = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const countryData = await fetchCountry.json();

  if (countryData.status === 404) {
    return {
      notFound: true,
    };
  }

  const filterCountryData = () => {
    console.log(countryData.length);
    if (countryData?.length > 1) {
      const requiredCountry = countryData.find(
        (countryObj: Country) => countryObj.name.common.toLowerCase() === country.toLowerCase()
      );

      if (requiredCountry) return requiredCountry;
    }
    return countryData[0];
  };
  const filteredCountryData: Country = filterCountryData();

  const fetchWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${filteredCountryData?.name?.common}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
  );
  const weatherData = await fetchWeather.json();
  const weather: Weather = weatherFilter(weatherData);
  const fetchImages = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${filteredCountryData?.name?.common}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
  );
  const countryImages: CountryImages = await fetchImages.json();

  return {
    props: { filteredCountryData, weather, countryImages },
  };
};

export default function CountryPage({
  filteredCountryData,
  weather,
  countryImages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [borders, setBorders] = useState<string[]>();
  const data = {
    lat: filteredCountryData?.latlng?.[0],
    long: filteredCountryData?.latlng?.[1],
  };

  const dateFetcher = async () => {
    await fetch(`/api/getCountryDate`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const { data } = res;
        const date = new Date(data);
        setDate(date);
      });
  };

  const { start, stop } = useImmediateInterval(() => {
    dateFetcher();
  }, 60000);

  useEffect(() => {
    const filterBorders = (borders: [string]) => {
      const found = borders.find((border) => border === "ISR");
      if (found) {
        const remove = borders.filter((border) => border !== "ISR");
        const isPal = remove.find((border) => border === "PSE");
        if (isPal) return remove;
        if (filteredCountryData?.name.common !== "Palestine") remove.push("PSE");
        return remove;
      }
      return borders;
    };
    start();
    if (filteredCountryData?.borders) {
      const findBorders = filterBorders(filteredCountryData?.borders);
      setBorders(findBorders);
    }
  }, [start, filteredCountryData?.borders, filteredCountryData?.name.common]);

  const currencyKeys = Object.keys(filteredCountryData?.currencies);
  console.log(countryImages);

  return (
    <>
      <Head>
        <title>{filteredCountryData?.name?.common}</title>
        <meta name="description" content="A website that provides information about countries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
      </Head>
      <main className="w-full min-h-screen h-full flex flex-col 2xl:gap-16 gap-12">
        <section className="w-full 2xl:pt-12 pt-4 relative">
          <div className={`font-heading w-36 flex items-center absolute left-16 text-atlas-gold`}>
            <Link href="/" className="w-full">
              <h1 className="text-5xl leading-atlas-heading antialiased">ATLAS</h1>
            </Link>
          </div>
          <Link
            href="/?search=1"
            className="cursor-pointer  absolute right-24 top-9 w-7 h-7 flex justify-center items-center"
          >
            <span className="w-5 h-5 block rotate-45 border-white border-solid border-b-4 border-l-4"></span>
          </Link>
          <button
            className="cursor-pointer  absolute right-10 top-10 w-7 h-7 flex justify-center items-center"
            onClick={() => {
              router.push(`/`);
            }}
          >
            <span className="w-5 h-5 block rotate-45 border-white border-solid border-t-4 border-l-4"></span>
          </button>
        </section>
        <section className="w-full flex flex-col justify-center items-center 2xl:gap-16 gap-12 mb-10">
          <div
            className={`font-heading w-full flex justify-center items-center gap-1 text-4xl text-atlas-gold antialiased`}
          >
            <h1>{filteredCountryData?.name?.official},</h1>
            <h1>{`(${filteredCountryData?.name?.common})`}</h1>
          </div>
          <div className="flex md:flex-row flex-col relative justify-start items-start w-full 2xl:pl-40 pl-16 2xl:gap-60 gap-20">
            <div className="flex flex-col justify-center items-center 2xl:gap-8 gap-4 pt-8">
              <Image
                src={filteredCountryData?.flags?.svg}
                width="275"
                height="170"
                alt={filteredCountryData?.flags?.alt}
                className="h-44 w-72"
              ></Image>
              <Image
                src={countryImages?.results?.[0].urls?.full}
                width="500"
                height="340"
                alt={`A photo of ${countryImages?.results?.[0].description} `}
                className="h-auto w-101 object-contain rounded-lg"
              />
              <p className="text-atlas-gold text-sm antialiased ">
                This photo is taken by <em>{countryImages?.results?.[0].user.first_name}</em> on{" "}
                <a href="https://unsplash.com/" className="underline">
                  Unsplash
                </a>
              </p>
            </div>
            <div className="flex flex-col  gap-4 2xl:text-3xl text-2xl">
              <div className="flex pb-4 h-full items-center w-full 2xl:gap-40 gap-24">
                <p className="text-atlas-gold font-semibold w-60">Content: </p>
                <p className="text-gray-50 antialiased ">{filteredCountryData?.continents?.[0]}</p>
              </div>
              <hr className="h-px rounded-lg bg-[#F3F4F6] 2xl:w-104 w-100 relative 2xl:left-8 left-4  border-0 " />
              <div className="flex py-10 h-full items-center w-full  2xl:gap-40 gap-24    ">
                <p className="text-atlas-gold font-semibold w-60">Capital: </p>
                <p className="text-gray-50 antialiased ">{filteredCountryData?.capital?.[0]}</p>
              </div>
              <hr className="h-px rounded-lg bg-[#F3F4F6] 2xl:w-104 w-100 relative 2xl:left-8 left-4  border-0 " />
              <div className="flex py-10 h-full items-center w-full 2xl:gap-40 gap-24 ">
                <p className="text-atlas-gold font-semibold w-60">Current Time: </p>
                <div className="text-gray-50 relative antialiased flex items-center gap-4">
                  <p>
                    {date?.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>

                  {date?.getHours() && date?.getHours() > 12 ? (
                    <Image
                      src="/images/moon.png"
                      width={156}
                      height={156}
                      alt="Night Time"
                      className="w-40 h-40 !max-w-max  absolute 2xl:left-44 left-28"
                    />
                  ) : (
                    <Image
                      src="/images/sun.png"
                      width={156}
                      height={156}
                      alt="Night Time"
                      className="w-40 h-40 !max-w-max  absolute 2xl:left-44 left-28"
                    />
                  )}
                </div>
              </div>
              <hr className="h-px rounded-lg bg-[#F3F4F6] 2xl:w-104 w-100 relative 2xl:left-8 left-4  border-0 " />
              <div className="flex py-10 h-full items-center w-full  2xl:gap-36 gap-24 ">
                <p className="text-atlas-gold font-semibold w-64">Current Weather: </p>
                <p className="text-gray-50 antialiased ">
                  {weather?.main.temp}
                  <span className="2xl:text-2xl text-lg">
                    {" "}
                    °C {weather?.weather[0].description}
                  </span>
                </p>
              </div>
              <hr className="h-px rounded-lg bg-[#F3F4F6] 2xl:w-104 w-100 relative 2xl:left-8 left-4  border-0 " />
              <div className="flex py-10 h-full items-center w-full  2xl:gap-40 gap-24 ">
                <p className="text-atlas-gold font-semibold w-60">Currency: </p>
                <p className="text-gray-50 antialiased ">
                  {filteredCountryData?.currencies[currencyKeys[0]].name}{" "}
                  {filteredCountryData?.currencies[currencyKeys[0]].symbol}
                </p>
              </div>
              <hr className="h-px rounded-lg bg-[#F3F4F6] 2xl:w-104 w-100 relative 2xl:left-8 left-4  border-0 " />
              <div className="flex py-10 h-full items-center w-full  2xl:gap-40 gap-24 ">
                <p className="text-atlas-gold font-semibold w-60">Population: </p>
                <p className="text-gray-50 antialiased ">
                  {filteredCountryData?.population} inhabitants
                </p>
              </div>
              {filteredCountryData?.borders && (
                <>
                  <hr className="h-px rounded-lg bg-[#F3F4F6] 2xl:w-104 w-100 relative 2xl:left-8 left-4  border-0 " />
                  <div className="flex py-10 h-full items-center w-full  2xl:gap-28 gap-24">
                    <p className="text-atlas-gold font-semibold w-72">Bordering countries: </p>
                    <p className="text-gray-50 antialiased w-1/4">
                      {borders?.map((border, index) => {
                        return <span key={index}>{border} </span>;
                      })}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
