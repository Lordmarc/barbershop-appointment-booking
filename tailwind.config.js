/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            "primary": "#d4af35",
            "background-light": "#f8f7f6",
            "background-dark": "#12110d",
            "neutral-dark": "#1c1a14",
            "neutral-border": "#3d3829",
        },
        fontFamily: {
            "display": ["Space Grotesk"]
        },
        borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
    },
  },
  plugins: [],
}

