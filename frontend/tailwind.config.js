/** Paleta tomada del logo de Active Gym: carbón oscuro, rojo y blanco. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        carbon: { 950: '#161618', 900: '#1d1d20', 800: '#26262a', 700: '#34343a', 600: '#4a4a52' },
        brand: { DEFAULT: '#e32227', dark: '#b81b1f', light: '#ff4a4f' },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
