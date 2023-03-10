/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      fill: {
        primary: "#0006B1",
        secondary: "#020079",
        background: "#05014A",
        buttonOn: "#0013DE",
        buttonOff: "#0006B1",
        modal: "#FFFFFF",
      },
      text: {
        primary: "#FFFFFF",
        link: "#0021F3",
        errorRed: "#FF0000",
        alternate: "#232323",
      },
      stroke: {
        input: '#cfcfcf'
      }
    },
    extend: {},
  },
  plugins: [],
};
