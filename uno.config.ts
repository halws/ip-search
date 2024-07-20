import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-6 py-1 flex items-center rounded inline-block bg-cornflower-300 text-white cursor-pointer hover:bg-cornflower-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-cornflower-600 !outline-none'],
  ],
  theme: {
    colors: {
      cornflower: {
        50: '#f1f9fe',
        100: '#e2f1fc',
        200: '#bee3f9',
        300: '#8bcff5',
        400: '#43b3ed',
        500: '#1b99dc',
        600: '#0e7abb',
        700: '#0c6198',
        800: '#0e537e',
        900: '#124568',
        950: '#0c2c45',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
