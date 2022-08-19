/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#FFF3E7',
      },
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
            code: {
              backgroundColor: theme('colors.gray.200'),
              color: theme('colors.secondary'),
              borderRadius: '0.25rem',
            },
            blockquote: {
              color: theme('colors.accent'),
              borderLeftColor: theme('colors.accent'),
              marginLeft: '1rem',
              fontWeight: '400',
            },
            // list style color override
            'ol > li::marker': theme('colors.primary'),
            'ul > li::marker': theme('colors.primary'),
            figcaption: {
              color: theme('colors.accent'),
              opacity: 0.7,
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
          secondary: '#065f46', // emerald.800
          'secondary-focus': '#4d8072',
          accent: '#6C70AD',
          neutral: '#C1C7D1',
          'base-100': '#FFF3E7', // daisyui default blank background
          '.btn': {
            'text-transform': 'none', // remove all-caps on buttons
          },
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
