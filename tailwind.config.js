/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "atlas-world": "url('/images/atlasBG.png')",
        "atlas-intro": "linear-gradient(116.82deg, #1E1719 66.98%, #172027 87.29%, #112732 100%)",
        "atlas-search": "linear-gradient(243.18deg, #112732 19.06%, #1E171C 84.17%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        heading: ["var(--font-lora)", "Arial", "sans-serif"],
      },
      colors: {
        "atlas-gold": " #FFC045",
      },
      lineHeight: {
        "atlas-heading": "3.75rem",
        "atlas-heading-sm": "1.875rem",
      },
      fontSize: {
        hover: "2rem",
      },
    },
  },
  plugins: [],
};
