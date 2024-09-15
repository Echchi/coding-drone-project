/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "dunggeunmiso-b": ["DunggeunmisoB", "sans-serif"],
        "dunggeunmiso-r": ["DunggeunmisoR", "sans-serif"],
        pretendard: ["Pretendard-Regular", "sans-serif"],
        JetBrains: ["JetBrainsMono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
