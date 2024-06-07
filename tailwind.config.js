/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Ensure this path correctly encompasses all your React components
    "./public/index.html",         // If you use Tailwind classes in your index.html
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
],
}

