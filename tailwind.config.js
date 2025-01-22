/** @type {import('tailwindcss').Config} */
import tailwindTypography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindTypography, daisyui],
  daisyui: {
    themes: ["cupcake"],
  },
};
