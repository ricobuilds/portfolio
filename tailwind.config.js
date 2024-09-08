const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      'xs': '.75rem', // 12xpx
      'sm': '.875rem', // 14px
      'base': '1rem', // 16px
      'lg': '1.125rem', // 18px
      'xl': '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.75rem', // 28px
      '4xl': '2rem', // 32px
      '5xl': '2.5rem', // 40px
      '6xl': '3rem', // 48px
      '7xl': '3.625rem', // 58px
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        neropside: '#0f172a',
        asphalt: '#1a232e',
        shadix: '#252525',
        charkol: '#121212',
        onyx: '#f4f4fc', // backgrounds
        amethyst: {
          50: '#f7f7ff',
          100: '#f0efff',
          200: '#d9d6ff',
          300: '#c1bdff',
          400: '#938cff',
          500: '#655bff',
          600: '#5b52e6',
          700: '#4c44bf',
          800: '#3d3799',
          900: '#312d7d',
        },
        bayoux: {
          50: '#fbfdff',
          100: '#f7fbff',
          200: '#ecf6ff',
          300: '#e0f0ff',
          400: '#c9e5ff',
          500: '#B2DAFF',
          600: '#a0c4e6',
          700: '#86a4bf',
          800: '#6b8399',
          900: '#576b7d',
        },
        citrine: {
          50: '#fffdf5',
          100: '#fffbeb',
          200: '#fff4cc',
          300: '#ffedad',
          400: '#ffe070',
          500: '#FFD333',
          600: '#e6be2e',
          700: '#bf9e26',
          800: '#997f1f',
          900: '#7d6719',
        },
        jade: {
          50: '#f2fefa',
          100: '#e6fcf5',
          200: '#bff9e6',
          300: '#99f5d6',
          400: '#4dedb8',
          500: '#00E599',
          600: '#00ce8a',
          700: '#00ac73',
          800: '#00895c',
          900: '#00704b',
        },
        celuria: {
          '50': '#f2f8ff',
          '100': '#e6f1ff',
          '200': '#bfddff',
          '300': '#99c9ff',
          '400': '#4da0ff',
          '500': '#0077ff',
          '600': '#006be6',
          '700': '#0059bf',
          '800': '#004799',
          '900': '#003a7d'
        },
        lazure: {
          50: '#f2fbff',
          100: '#e6f7ff',
          200: '#bfeaff',
          300: '#99ddff',
          400: '#4dc4ff',
          500: '#00AAFF',
          600: '#0099e6',
          700: '#0080bf',
          800: '#006699',
          900: '#00537d',
        },
        obsidian: {
          50: '#f7f8f9',
          100: '#eff1f4',
          200: '#d6dce3',
          300: '#bec7d3',
          400: '#8d9cb1',
          500: '#5C7290',
          600: '#536782',
          700: '#45566c',
          800: '#374456',
          900: '#2d3847',
        },
        purpalite: {
          50: '#fef5fe',
          100: '#fceafc',
          200: '#f9cbf9',
          300: '#f5abf5',
          400: '#ed6ded',
          500: '#E52EE5',
          600: '#ce29ce',
          700: '#ac23ac',
          800: '#891c89',
          900: '#701770',
        },
        rosian: {
          50: '#fff6fa',
          100: '#ffecf4',
          200: '#ffd0e4',
          300: '#feb4d3',
          400: '#fe7bb2',
          500: '#FD4391',
          600: '#e43c83',
          700: '#be326d',
          800: '#982857',
          900: '#7c2147',
        },
        scarlet: {
          50: '#fff5f7',
          100: '#ffecef',
          200: '#ffcfd7',
          300: '#ffb3bf',
          400: '#ff7990',
          500: '#FF4060',
          600: '#e63a56',
          700: '#bf3048',
          800: '#99263a',
          900: '#7d1f2f',
        },
        sunstone: {
          50: '#fff9f6',
          100: '#fff2ec',
          200: '#ffdfd0',
          300: '#ffcbb4',
          400: '#ffa57c',
          500: '#FF7E44',
          600: '#e6713d',
          700: '#bf5f33',
          800: '#994c29',
          900: '#7d3e21',
        },
        tingual: {
          50: '#f2fcfb',
          100: '#e6f8f7',
          200: '#c0efeb',
          300: '#9ae5de',
          400: '#4fd1c6',
          500: '#03bdad',
          600: '#03aa9c',
          700: '#028e82',
          800: '#027168',
          900: '#015d55',
        },
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        // // Dropdown menu
        // "scale-in": {
        //   "0%": { opacity: 0, transform: "scale(0)" },
        //   "100%": { opacity: 1, transform: "scale(1)" },
        // },
        // "slide-down": {
        //   "0%": { opacity: 0, transform: "translateY(-10px)" },
        //   "100%": { opacity: 1, transform: "translateY(0)" },
        // },
        // "slide-up": {
        //   "0%": { opacity: 0, transform: "translateY(10px)" },
        //   "100%": { opacity: 1, transform: "translateY(0)" },
        // },
        // // Tooltip
        // "slide-up-fade": {
        //   "0%": { opacity: 0, transform: "translateY(2px)" },
        //   "100%": { opacity: 1, transform: "translateY(0)" },
        // },
        // "slide-right-fade": {
        //   "0%": { opacity: 0, transform: "translateX(-2px)" },
        //   "100%": { opacity: 1, transform: "translateX(0)" },
        // },
        // "slide-down-fade": {
        //   "0%": { opacity: 0, transform: "translateY(-2px)" },
        //   "100%": { opacity: 1, transform: "translateY(0)" },
        // },
        // "slide-left-fade": {
        //   "0%": { opacity: 0, transform: "translateX(2px)" },
        //   "100%": { opacity: 1, transform: "translateX(0)" },
        // },
        // // Navigation menu
        // "enter-from-right": {
        //   "0%": { transform: "translateX(200px)", opacity: 0 },
        //   "100%": { transform: "translateX(0)", opacity: 1 },
        // },
        // "enter-from-left": {
        //   "0%": { transform: "translateX(-200px)", opacity: 0 },
        //   "100%": { transform: "translateX(0)", opacity: 1 },
        // },
        // "exit-to-right": {
        //   "0%": { transform: "translateX(0)", opacity: 1 },
        //   "100%": { transform: "translateX(200px)", opacity: 0 },
        // },
        // "exit-to-left": {
        //   "0%": { transform: "translateX(0)", opacity: 1 },
        //   "100%": { transform: "translateX(-200px)", opacity: 0 },
        // },
        // "scale-in-content": {
        //   "0%": { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
        //   "100%": { transform: "rotateX(0deg) scale(1)", opacity: 1 },
        // },
        // "scale-out-content": {
        //   "0%": { transform: "rotateX(0deg) scale(1)", opacity: 1 },
        //   "100%": { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
        // },
        // "fade-in": {
        //   "0%": { opacity: 0 },
        //   "100%": { opacity: 1 },
        // },
        // "fade-out": {
        //   "0%": { opacity: 1 },
        //   "100%": { opacity: 0 },
        // },
        // // Toast
        // hide: {
        //   from: { opacity: 1 },
        //   to: { opacity: 0 },
        // },
        // slideIn: {
        //   from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        //   to: { transform: 'translateX(0))' },
        // },
        // swipeOut: {
        //   from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
        //   to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        // },
        // // Hover Card
        // slideDownAndFade: {
        //   from: { opacity: 0, transform: 'translateY(-2px)' },
        //   to: { opacity: 1, transform: 'translateY(0)' },
        // },
        // slideLeftAndFade: {
        //   from: { opacity: 0, transform: 'translateX(2px)' },
        //   to: { opacity: 1, transform: 'translateX(0)' },
        // },
        // slideUpAndFade: {
        //   from: { opacity: 0, transform: 'translateY(2px)' },
        //   to: { opacity: 1, transform: 'translateY(0)' },
        // },
        // slideRightAndFade: {
        //   from: { opacity: 0, transform: 'translateX(2px)' },
        //   to: { opacity: 1, transform: 'translateX(0)' },
        // },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",

        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        // // Dropdown menu
        // "scale-in": "scale-in 0.2s ease-in-out",
        // "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        // "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        // // Tooltip
        // "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        // "slide-right-fade":
        //   "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        // "slide-down-fade": "slide-down-fade 1s cubic-bezier(0.16, 1, 0.3, 1)",
        // "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        // // Navigation menu
        // "enter-from-right": "enter-from-right 0.25s ease",
        // "enter-from-left": "enter-from-left 0.25s ease",
        // "exit-to-right": "exit-to-right 0.25s ease",
        // "exit-to-left": "exit-to-left 0.25s ease",
        // "scale-in-content": "scale-in-content 0.2s ease",
        // "scale-out-content": "scale-out-content 0.2s ease",
        // "fade-in": "fade-in 0.2s ease",
        // "fade-out": "fade-out 0.2s ease",
        // // Toast
        // 'hide': 'hide 100ms ease-in',
        // 'slideIn': 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        // 'swipeOut': 'swipeOut 100ms ease-out',
        // // Hover Card
        // 'slideUpAndFade': 'slideUpAndFade 500ms cubic-bezier(0.16, 0, 0.13, 1)',
        // 'slideDownAndFade': 'slideDownAndFade 500ms cubic-bezier(0.16, 0, 0.13, 1)',
        // 'slideRightAndFade': 'slideRightAndFade 500ms cubic-bezier(0.16, 0, 0.13, 1)',
        // 'slideLeftAndFade': 'slideLeftAndFade 500ms cubic-bezier(0.16, 0, 0.13, 1)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    addVariablesForColors,
  ],
};
export default config;

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}