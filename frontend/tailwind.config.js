/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f2f3f5",
        secondary: "#004AAD",
      },
    },
  },
  plugins: [require("daisyui")],
};
