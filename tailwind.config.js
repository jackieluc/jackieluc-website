/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary'),
            a: {
              color: theme('colors.secondary'),
              '&:hover': {
                color: '#4d8072',
              },
            },
            h1: {
              color: theme('colors.secondary'),
            },
            h2: {
              color: theme('colors.secondary'),
            },
            h3: {
              color: theme('colors.secondary'),
            },
            h4: {
              color: theme('colors.secondary'),
            },
            strong: {
              color: theme('colors.primary'),
            },
          },
        },
      }),
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#779D83',
          secondary: '#2D4A43',
          'secondary-focus': '#4d8072',
          accent: '#6C70AD',
          neutral: '#C1C7D1',
          'base-100': '#FFF3E7',
          '.btn': {
            'text-transform': 'none', // remove all-caps on buttons
          },
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
