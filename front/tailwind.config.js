/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  theme: {
    extend: {
      colors: {
        "light-green": "#44ba9f",
        "green": "#286d5d",
        "light-grey": "#f1f1f1",
      },
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};