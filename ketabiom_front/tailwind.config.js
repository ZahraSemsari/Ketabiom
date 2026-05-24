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
      },
    },
  },
  plugins: [],
};
