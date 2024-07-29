import { content as flowbiteContent, plugin as flowbitePlugin } from "flowbite-react/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbiteContent()
  ],
  theme: {
    extend: {},
    colors: {
      "black-primary": "#181818",
      "black-secondary": "#252525",
      "gray-primary": "#232323",
      "gray-secondary": "#2B2D2F",
      "blue-primary": "#0A77FF",
      "red-primary": "#E13A32",
      "green-primary": "#27B973"
    }
  },
  plugins: [
    flowbitePlugin()
  ],
}