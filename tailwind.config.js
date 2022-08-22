/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
		extend: {
			height: {
				"screen-minus-private-header": 'calc(100vh - var(--private-header-height))',
				"private-header": 'var(--private-header-height)',
			}
		},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
