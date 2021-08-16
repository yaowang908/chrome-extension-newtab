module.exports = {
  purge: {
    content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.tsx", "./index.html"],
    safelist: [
      ...Array.from({ length: 12}).fill('').map((_, i) => `col-span-${i + 1}`),
      ...Array.from({ length: 12}).fill('').map((_, i) => `grid-cols-${i + 1}`),
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
