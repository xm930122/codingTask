/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 使用 CSS 变量
        background: "var(--background)",
        foreground: "var(--foreground)",

        // 文本颜色
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",

        // 品牌颜色
        "primary-pink": "var(--primary-pink)",
        "row-hovered": "var(--row-hovered)",

        // 状态颜色
        upside: "var(--upside)",
        downside: "var(--downside)",

        // UI 颜色
        border: "var(--border)",
        borderBottom: "1px solid var(--border)"
      },
    },
  },
  plugins: [],
};

// tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // 使用 CSS 变量
//         background: 'var(--background)',
//         foreground: 'var(--foreground)',

//         // 文本颜色
//         primary: 'var(--text-primary)',
//         secondary: 'var(--text-secondary)',

//         // 品牌颜色
//         'primary-pink': 'var(--primary-pink)',
//         'row-hovered': 'var(--row-hovered)',

//         // 状态颜色
//         upside: 'var(--upside)',
//         downside: 'var(--downside)',

//         // UI 颜色
//         border: 'var(--border)',
//       },
//       fontFamily: {
//         sans: ['var(--font-geist-sans)'],
//         mono: ['var(--font-geist-mono)'],
//       },
//     },
//   },
//   plugins: [],
// }
