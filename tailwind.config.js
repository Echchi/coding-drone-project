/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
