import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

type name = {
  common: string;
  official: string;
};
type Country = {
  name: name;
};

const countries = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

export default function SearchBox() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selected, setSelected] = useState(countries[0]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=name`)
      .then((res) => res.json())
      .then((res) => {
        const countries: Country[] = res.filter(
          (country: Country) => country.name.common !== "Israel"
        );
        setCountries(countries);
      });
  }, [setCountries]);
  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-1/2 h-full items-center justify-center">
      <Combobox
        value={selected}
        onChange={(event) => {
          router.push(`/${event.name.common}`);
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-atlas-gold sm:text-sm">
            <Combobox.Input
              className="w-full h-10 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(country: Country) => country.name.common}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter a country name"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCountries.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <Combobox.Option
                    key={country.name.official}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "text-atlas-gold bg-[#112732]" : "text-gray-900"
                      }`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <>
                        <button
                          className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                          onClick={() => {
                            router.push(`/${country}`);
                          }}
                        >
                          {country.name.common}
                        </button>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-atlas-gold"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
