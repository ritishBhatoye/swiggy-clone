/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 🔶 Primary: Swiggy Orange
        primary: {
          50: "#FFF7F0",
          100: "#FFE5D1",
          200: "#FFD1AA",
          300: "#FFB476",
          400: "#FF9440",
          500: "#FC8019", //Base Swiggy Orange
          600: "#E66E11",
          700: "#BF590D",
          800: "#99450A",
          900: "#7A3608",
        },

        // 🟠 Secondary: Golden/Deep Red/Tan/Beige
        secondary: {
          golden: {
            100: "#FFF4DB",
            200: "#FFE3AD",
            300: "#FFD180",
            400: "#F5B84C",
            500: "#D4902A",
            600: "#B37615",
            700: "#8D5D0C",
            800: "#68440A",
            900: "#4D3307",
          },
          deepRed: {
            100: "#FCE9E7",
            200: "#F6C1BA",
            300: "#ED988C",
            400: "#E56D5E",
            500: "#941C04",
            600: "#751703",
            700: "#580F02",
            800: "#3C0A01",
            900: "#280601",
          },
          tan: "#D0A881",
          beige: "#CEBCA5",
        },

        // 🌈 Tertiary: Breakfast Theme + Accent Colors
        tertiary: {
          yellow: {
            100: "#FFFBE6",
            200: "#FFF2B8",
            300: "#FFE88A",
            400: "#FFDE5C",
            500: "#F3C334",
            600: "#D4A915",
            700: "#A47F0F",
            800: "#73580A",
            900: "#4A3A06",
          },
          green: {
            100: "#F4FBE6",
            200: "#D7F1AD",
            300: "#B3E376",
            400: "#8FD54D",
            500: "#689418",
            600: "#557B12",
            700: "#42610D",
            800: "#2F4809",
            900: "#1F3205",
          },
          mauve: "#B6A0A7",
          brown: "#6C4434",
          maroon: "#582630",
        },

        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
