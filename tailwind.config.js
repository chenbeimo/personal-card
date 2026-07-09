/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ── 字体 ── */
      fontFamily: {
        'serif-display': ['"Instrument Serif"', 'serif'],
        'body': ['system-ui', 'sans-serif'],
      },
      /* ── 配色 ── */
      colors: {
        'dark-ink': '#182C41',
      },
      /* ── 动画时长 ── */
      transitionDuration: {
        '1000': '1000ms',
      },
      /* ── 最大宽度 ── */
      maxWidth: {
        'prose-lg': '42rem',
      },
    },
  },
  plugins: [],
}
