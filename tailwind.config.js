/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      top: {
        arrow: "3.3rem",
      },
      height: {
        100: "26rem",
      },
      width: {
        100: "28rem",
        101: "31rem",
        102: "32rem",
        104: "35rem",
        110: "72rem",
      },

      backgroundImage: {
        "atlas-world": "url('/images/atlasBG.png')",
        "atlas-intro": "linear-gradient(116.82deg, #1E1719 66.98%, #172027 87.29%, #112732 100%)",
        "atlas-search": "linear-gradient(243.18deg, #112732 19.06%, #1E171C 84.17%)",
        "atlas-404": "linear-gradient(243.18deg, #112732 19.06%, #172028 34.17%, #1E171C 63.33%);",
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
      keyframes: {
        fall: {
          "0%": {
            opacity: "0",
            transform: "rotate(45deg) translate(-20px, -20px)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "rotate(45deg) translate(20px, 20px)",
          },
        },
      },
      animation: {
        fall: "fall 2s infinite",
      },
    },
  },
  plugins: [],
};
