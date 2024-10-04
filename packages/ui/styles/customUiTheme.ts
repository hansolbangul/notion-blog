import { CustomThemeConfig } from "tailwindcss/types/config";

export const customUiTheme: Partial<CustomThemeConfig> = {
  colors: {
    white: "#fff",

    orange100: "#FFE5B4",
    orange200: "#FFCC80",
    orange300: "#FFB74D",
    orange400: "#FFA726",
    orange500: "#FF9800",
    orange600: "#FB8C00",
    orange700: "#F57C00",
    orange800: "#EF6C00",
    orange900: "#E65100",

    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
  },
  fontWeight: {
    bold: "700",
    semiBold: "600",
    medium: "500",
    regular: "400",
  },
  fontSize: {
    body20: ["20px", "28px"],
    body18: ["18px", "26px"],
    body16: ["16px", "24px"],
    body15: ["15px", "21px"],
    body14: ["14px", "21px"],
    body13: ["13px", "20px"],
    body12: ["12px", "22px"],
  },
  backgroundImage: {
    "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    "gradient-conic":
      "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    "gradient-custom":
      "linear-gradient(to bottom, rgba(0, 0, 0, 0) 14%, rgba(0, 0, 0, 0.8))",
  },
  screens: {
    custom: "900px",
  },
};
