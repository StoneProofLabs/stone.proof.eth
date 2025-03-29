module.exports = {
  theme: {
    extend: {
      keyframes: {
        'diamond-sparkle': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 }
        },
        'diamond-sparkle-delayed': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 0.8 }
        }
      },
      animation: {
        'diamond-sparkle': 'diamond-sparkle 3s ease-in-out infinite',
        'diamond-sparkle-delayed': 'diamond-sparkle-delayed 3s ease-in-out'
      }
    }
  }
} 