/** @type {import('tailwindcss').Config} */
import tailwindTypography from "@tailwindcss/typography";
import daisyui from "daisyui";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [tailwindTypography, daisyui],
  daisyui: {
    themes: ["cupcake"],
  },
};
