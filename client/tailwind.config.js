/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html", "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
		animation: {
            shimmer: "shimmer 10s linear infinite"
		},
		keyframes: {
			shimmer: {
              from: {
                "backgroundPosition": "0 0"
              },
              to: {
                "backgroundPosition": "-200% 0"
              }
            }
		}
      
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	require('tailwindcss-motion')
],
}

