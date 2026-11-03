/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#166534',
          50: '#F0FAF3',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#166534',
          800: '#14532D',
          900: '#0F3D22',
        },
        mint: '#DCFCE7',
        canvas: '#F8FAF7',
        ink: '#17251B',
        muted: '#647067',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(23, 37, 27, 0.04), 0 1px 6px -1px rgba(23, 37, 27, 0.06)',
        'card-hover': '0 4px 12px -2px rgba(23, 37, 27, 0.10), 0 2px 6px -2px rgba(23, 37, 27, 0.06)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'toast-in': 'toastIn 0.25s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        toastIn: { '0%': { opacity: 0, transform: 'translateY(-8px) translateX(-50%)' }, '100%': { opacity: 1, transform: 'translateY(0) translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}
