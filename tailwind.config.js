/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customBgBlue: '#D9FAF7',
        customButtonBlue: '#24a0ed',
        customButtonHoverBlue: '#2690D5',
        customButtonActiveBlue: '#2781BD',
        customStudyButton: '#02BDE3',
      }
    },
  },
  plugins: [],
}
