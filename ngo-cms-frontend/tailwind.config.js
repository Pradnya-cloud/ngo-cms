/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF6EC",
        ivory2: "#F3EBD9",
        ink: "#2B2620",
        indigo: {
          DEFAULT: "#2C4A6E",
          deep: "#1D3350",
          light: "#4B6D93",
        },
        marigold: {
          DEFAULT: "#E8A33D",
          dark: "#C9821F",
          light: "#F5C878",
        },
        madder: {
          DEFAULT: "#B23A48",
          dark: "#8E2C38",
        },
        sage: {
          DEFAULT: "#5C7A5A",
          dark: "#425B41",
        },
      },
      fontFamily: {
        display: ["'Bitter'", "serif"],
        body: ["'Work Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
