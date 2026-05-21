/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fafafa",
        buttons: "#ba3873",
        bordercol: "#6e2948",
      },
    },
  },
  plugins: [],
};
