// tailwind.config.js
import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode by class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-green": "1px 1px 10px #4fa74f",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("flowbite/plugin")],
};
