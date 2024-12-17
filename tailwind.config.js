/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files in your project
    "./public/index.html",       // Include your HTML file (if applicable)
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        outfit: ['Outfit', 'Arial'],
        inter: ['Inter', 'Arial'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'muted-purple': 'rgba(175, 107, 240, 0.8)',
        'muted-peach': 'rgba(242,200,175, 0.8)',
        brightPurple: '#8509ea',
        'text-colour': '#98989A',
        borderColor: '#1d1d1d',
        peach: "#ffac9d",
      },
    },
  },
  plugins: [],
};
