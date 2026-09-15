export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF7F2",
          2: "#F3EFE8",
        },
        ink: "#1A1A2E",
        indigo: "#3D5A80",
        "indigo-deep": "#2C4A6E",
        marigold: {
          DEFAULT: "#E8A33D",
          dark: "#D4912C",
          light: "#F0B85C",
        },
        madder: {
          DEFAULT: "#B23A48",
          dark: "#8B2D3A",
        },
        sage: {
          DEFAULT: "#6B8E5C",
          dark: "#557348",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}