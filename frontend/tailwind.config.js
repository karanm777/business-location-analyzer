/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5F0",
        ink: {
          50: "#EAF1EF",
          100: "#CFE0DC",
          400: "#3E7167",
          500: "#12403B",
          600: "#0E332F",
          700: "#0A2622"
        },
        amber: {
          50: "#FBF0DF",
          400: "#E0973D",
          500: "#C97E28",
          600: "#A6661D"
        },
        sage: {
          400: "#7A9E8E",
          500: "#5F8474"
        },
        brick: {
          400: "#B5533C",
          500: "#9A4531"
        }
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      }
    }
  },
  plugins: []
};
