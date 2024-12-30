/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'btn-primary': '#EE6D1F',
        'text-primary': '#EE6D1F',
        'primary': '#EE6D1F',
        'secondary': '#9333EA',
        'neutral': '#64748B',
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#EE6D1F",
          "text-primary": "#EE6D1F",
          "secondary": "#9333EA",
          "neutral": "#64748B",
        },
      },
    ],
  },
}

