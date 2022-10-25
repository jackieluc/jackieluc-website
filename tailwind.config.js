/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#FFF3E7',
      },
      animation: {
        'fade-in-and-out': 'fadeInAndOut 2s linear 1 forwards',
      },
      keyframes: {
        fadeInAndOut: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
          '20%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '80%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary'),
            a: {
              color: theme('colors.secondary'),
              fontWeight: '400',
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
            // code block, not inline
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
            li: {
              '&::marker': {
                color: theme('colors.primary'),
              },
            },
            figcaption: {
              color: theme('colors.accent'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#779D83',
          secondary: '#065f46', // emerald.800
          'secondary-focus': '#4d8072',
          accent: '#6C70AD',
          neutral: '#ffd9b4',
          'base-100': '#FFF3E7', // daisyui default blank background
          'base-200': '#ffd9b4', // monochromatic
          '.btn': {
            'text-transform': 'none', // remove all-caps on buttons
          },
        },
      },
    ],
  },
};
