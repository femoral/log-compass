/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
    },
    fontFamily: {
      mono: ['"JetBrains Mono"', 'monospace'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
