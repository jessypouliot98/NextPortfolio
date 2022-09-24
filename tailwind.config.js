const colors = {
  transparent: 'rgba(0, 0, 0, 0)',
  current: 'currentColor',
  white: '#ffffff',
  gray: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  black: '#000000',
  blue: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{jsx,tsx,css}',
  ],
  safelist: [
    { pattern: /max-w-1-(\d)/, variants: ['sm', 'md', 'lg', 'xl'] }
  ],
  darkMode: 'class',
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      custom: '"▹ "',
    },
    extend: {
      maxWidth: {
        '1-1': '100.00%',
        '1-2': '50.00%',
        '1-3': '33.33%',
        '1-4': '25.00%',
        '1-5': '20.00%',
        '1-6': '16.66%',
      },
      colors,
    },
  },
  plugins: [],
}
