/** @type {import('tailwindcss').Config} */

// content에 확장자를 입력해줘야 tailwindcss가 적용된다.
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
