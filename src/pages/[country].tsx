import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import { fetcher } from "lib/axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const fetchCountry = await fetch(`https://restcountries.com/v3.1/name/${params?.country}`);
  const countryData = await fetchCountry.json();
  if (!countryData) {
    return {
      notFound: true,
    };
  }
  return {
    props: { countryData },
  };
};

export default function CountryPage({
  countryData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { country } = router.query;
  const { data, error, isLoading } = useSWR(
    `https://restcountries.com/v3.1/name/${country}`,
    fetcher
  );
  if (error) router.push(`/404`);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>{country}</title>
        <meta name="description" content="A website that provides information about countries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <section>
          <div className="w-screen h-screen flex justify-center items-center">
            <h1 className="text-red-900 text-7xl">{countryData[0]?.name?.official}</h1>
          </div>
        </section>
      </main>
    </>
  );
}
