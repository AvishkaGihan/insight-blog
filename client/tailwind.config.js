import flowbite from "flowbite-react/tailwind";
import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "hsl(220, 25%, 10%)",
        background: "hsl(0, 0%, 4%)",
        amber: {
          500: "hsl(30, 100%, 55%)",
        },
        steel: {
          500: "hsl(205, 70%, 50%)",
        },
        purple: {
          500: "hsl(270, 40%, 55%)",
        },
        text: {
          primary: "hsl(0, 0%, 92%)",
          muted: "hsl(215, 15%, 55%)",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite alternate",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px hsl(30, 100%, 55%), 0 0 10px hsl(30, 100%, 55%)" },
          "100%": { boxShadow: "0 0 10px hsl(30, 100%, 55%), 0 0 20px hsl(30, 100%, 55%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }
    },
  },
  plugins: [flowbite.plugin(), scrollbar],
};
