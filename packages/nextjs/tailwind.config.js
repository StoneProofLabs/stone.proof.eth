/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#93BBFB",
          "primary-content": "#212638",
          secondary: "#DAE8FF",
          "secondary-content": "#212638",
          accent: "#93BBFB",
          "accent-content": "#212638",
          neutral: "#212638",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#DAE8FF",
          "base-content": "#212638",
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",
          "--rounded-btn": "9999rem",
          ".tooltip": { "--tooltip-tail": "6px" },
          ".link": { textUnderlineOffset: "2px" },
          ".link:hover": { opacity: "80%" },
        },
      },
      {
        dark: {
          primary: "#212638",
          "primary-content": "#F9FBFF",
          secondary: "#323f61",
          "secondary-content": "#F9FBFF",
          accent: "#4969A6",
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",
          "neutral-content": "#385183",
          "base-100": "#385183",
          "base-200": "#2A3655",
          "base-300": "#212638",
          "base-content": "#F9FBFF",
          info: "#385183",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",
          "--rounded-btn": "9999rem",
          ".tooltip": { "--tooltip-tail": "6px", "--tooltip-color": "oklch(var(--p))" },
          ".link": { textUnderlineOffset: "2px" },
          ".link:hover": { opacity: "80%" },
        },
      },
      // Adding a Stone.Proof theme that matches the design
      {
        stoneproof: {
          primary: "#2563EB", // Blue for primary buttons
          "primary-content": "#FFFFFF",
          secondary: "#1E293B", // Dark blue for secondary elements
          "secondary-content": "#FFFFFF",
          accent: "#FFD700", // Gold color for "Blockchain" text
          "accent-content": "#212638",
          neutral: "#0F172A", // Dark background
          "neutral-content": "#FFFFFF",
          "base-100": "#1E293B", // Dark blue base
          "base-200": "#0F172A", // Darker blue
          "base-300": "#020617", // Almost black
          "base-content": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          "--rounded-btn": "0.375rem", // Slightly rounded buttons as in the design
          ".tooltip": { "--tooltip-tail": "6px" },
          ".link": { textUnderlineOffset: "2px" },
          ".link:hover": { opacity: "80%" },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: { center: "0 0 12px -2px rgb(0 0 0 / 0.05)" },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite", // For floating mineral animations
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      colors: {
        // Adding Stone.Proof specific colors
        blockchain: "#FFD700",
       
        crystal: {
          100: "#E0F2FE", // Light crystal blue
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9", // Medium crystal blue
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985", // Dark crystal blue
          900: "#0C4A6E",
        },
        mineral: {
          dark: "#0F172A", // Dark mineral background
          light: "#94A3B8", // Light mineral color
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'mineral-pattern': "url('/minerals-background.jpg')",
        'fade-white': 'linear-gradient(to right, #FFFFFF, rgb(255 255 255 / 1), rgb(255 255 255 / 0.4))',
        
      },
    },
  },
};