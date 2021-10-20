module.exports = {
  purge: {
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.tsx",
      "./index.html",
    ],
    safelist: [
      ...Array.from({ length: 12 })
        .fill("")
        .map((_, i) => `col-span-${i + 1}`),
      ...Array.from({ length: 12 })
        .fill("")
        .map((_, i) => `grid-cols-${i + 1}`),
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: "fadeOut 2s ease-in-out",
      },

      // that is actual animation
      keyframes: () => ({
        fadeOut: {
          "0%":   { opacity: 0, top: '10%' },
          "80%":  { opacity: 1, top: '20%' },
          "100%": { opacity: 0, top: '25%' }
        },
      }),
    },
  },
  variants: {
    extend: {
      borderWidth: ["last"],
      display: ["group-hover"],
      gridColumn: ["group-hover"],
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["group-hover"],
      backgroundOpacity: ["group-hover"],
    },
  },
  plugins: [],
};
