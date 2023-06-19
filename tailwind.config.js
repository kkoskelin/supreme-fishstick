import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/**/*.{html,ts,jsx,tsx}'],
  mode: 'jit',
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
  theme: {
    extend: {
      colors: {
        accent: colors.green,
        primary: colors.gray,
        secondary: colors.indigo,
      },
    },
    fontFamily: {
      sans: ['Helvetica', 'sans-serif'],
      serif: ['Helvetica', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
};
