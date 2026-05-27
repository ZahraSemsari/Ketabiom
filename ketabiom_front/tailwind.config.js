/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fafafa",
        buttons: "#4499AF",
        bordercol: "#236474",
        shadow: "#BCDEE7",
        searchbg: "#EBF5F7",
        gray1: "#EAEAEA",
        gray2: "#D9D9D9",
        black: "#000000",
        darkgray: "#3D3D3D",
      },
    },
  },
  plugins: [],
};
