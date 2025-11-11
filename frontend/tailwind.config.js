/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        ring: "var(--ring)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        "muted-foreground": "var(--muted-foreground)",
        "card-foreground": "var(--card-foreground)",
        primaryText: "var(--primaryText)",
        bgSecondary: "var(--bgSecondary)",
        "primary-bg": "var(--primary-bg)",
        placeholderText: "var(--placeholderText)",
        "text-primaryText": "var(--text-primaryText)",
      },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};

