import type { Config } from "tailwindcss";
import { customUiTheme } from "./styles/customUiTheme";

const config: Config = {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      ...customUiTheme,
    },
  },
  plugins: [],
};
export default config;
