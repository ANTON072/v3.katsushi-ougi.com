module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./domain/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Noto Sans",
          "Helvetica Neue",
          "Helvetica",
          "Hiragino Kaku Gothic ProN",
          "Meiryo",
          "sans-serif",
        ],
        en: ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
