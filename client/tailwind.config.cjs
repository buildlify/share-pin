/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        background: '#CED5E4',
        lightGreen: '#74C78F',
        lightRed: '#C77474',
      },
      textColor: {
        dark: '#06042F',
      },
    },
  },
  plugins: [require('daisyui')],
};
