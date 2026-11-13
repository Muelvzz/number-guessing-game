// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shrink: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      },
    },
  },
};