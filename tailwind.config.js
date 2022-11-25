/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': {
        DEFAULT: '#FFFFFF',
        off: '#F8F8FB',
      },
      'purple': {
        DEFAULT: '#7C5DFA',
        light: '#9277FF',
      },
      'blue': {
        vdark: '#1E2139',
        dark: '#252945',
        light: '#DFE3FA',
        vlight: '#F9FAFE',
        vgray: '#888EB0',
        gray: '#7E88C3',
        mgray: '#858BB2',
        deep: '#373B53',
        mdeep: '#494E6E'
      },
      'black': {
        DEFAULT: '#0C0E16',
        off: '#141625'
      },
      'red': {
        DEFAULT: '#EC5757',
        light: '#FF9797'
      },
      'green': '#33D69F',
      'yellow': '#FF8F00'
    },
    fontSize: {
      xs: '1.1rem',
      sm: '1.2rem',
      ms: '1.5rem',
      md: '1.6rem',
      lg: '2rem',
      xl: '3.2rem',
    },
    lineHeight: {
      xs: '1.5rem',
      sm: '1.8rem',
      ms: '2rem',
      md: '2.2rem',
      lg: '2.4rem',
      xl: '3.6rem',
    },
    extend: {
      letterSpacing: {
        xs: '-1px',
        sm: '-0.8px',
        md: '-0.63px',
        lg: '-0.25px',
        xl: '-0.23px'
      },
      borderRadius: {
        lgs: '0.6rem',
        xls: '0.8rem',
        '4xl': '2rem',
        '4ls': '2.4rem'
      },
      boxShadow: {
        lgs: '0px 10px 10px -10px rgba(72, 84, 159, 0.100397)'
      },
      spacing: {
        0.8: '0.8rem',
        1.2: '1.2rem',
        1.6: '1.6rem',
        2.4: '2.4rem',
        3.2: '3.2rem',
        4.8: '4.8rem',
        10.3: '10.3rem'
      }
    },
  },
  plugins: ['@tailwindcss/forms'],
  darkMode: 'class'
}
