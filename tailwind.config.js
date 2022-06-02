module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./domain/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "var(--black)",
      grey1: "var(--grey1)",
      grey2: "var(--grey2)",
      grey3: "var(--grey3)",
      red: "var(--red)",
    },
    extend: {
      spacing: {
        maxWidth: "var(--max-width)",
        padding: "var(--padding)",
        headerHeight: "var(--header-height)",
        sidebarWidth: "var(--sidebar-width)",
      },
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
