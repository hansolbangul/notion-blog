/** @type {import('tailwindcss').Config} */
const { customUiTheme } = require("@blog/ui/styles/customUiTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      ...customUiTheme,
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
