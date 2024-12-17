/** @type {import('tailwindcss').Config} */

module.exports = {
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
                peach:"#ffac9d"
      }
    },
  },
  plugins: [],
};

// export default {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backdropBlur: {
//         xs: '2px', // Custom size
//         custom: '15px',
//       },
//       colors: {
//         background: 'var(--background)',
//         foreground: 'var(--foreground)',
//         'muted-purple': 'rgba(175, 107, 240, 0.8)',
//         'muted-peach': 'rgba(242,200,175, 0.8)',
//         brightPurple: '#8509ea',
//         'text-colour': '#98989A',
//         borderColor: '#1d1d1d',
//       },
//       fontFamily: {
//         sora: ['Sora', 'sans-serif'],
//         outfit: ['Outfit', 'Arial'],
//         inter: ['Inter', 'Arial'],
//       },
//       animation: {
//         'spin-fast': 'spin 1s linear infinite',
//         'spin-slow': 'spin 3s linear infinite',
//       },
//       keyframes: {
//         spin: {
//           '0%': { transform: 'rotate(0deg)' },
//           '100%': { transform: 'rotate(360deg)' },
//         },
//       },
//     },
//   },
//   plugins: [],
// }
