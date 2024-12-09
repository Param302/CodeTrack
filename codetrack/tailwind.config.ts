import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#007BFF',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				light: '#ADD8E6',
  				dark: '#5DADE2',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
        background: {
          DEFAULT: 'hsl(var(--background))',
          light: '#F5F9FF',
          dark: '#1B1E23',
        },
  			card: {
  				light: '#FAFCFF',
  				dark: '#2C2F33',
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			content: {
  				light: '#2C3E50',
  				dark: '#D1D5DB'
  			},
  			subtle: {
  				light: '#6C757D',
  				dark: '#A0AEC0'
  			},
  			highlight: '#32CD32',
        border: {
          light: '#B0C4DE',
          dark: '#3B3F44',
        },
  			// foreground: 'hsl(var(--foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideIn: {
  				'0%': {
  					transform: 'translateY(10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			fadeIn: 'fadeIn 0.5s ease-out',
  			slideIn: 'slideIn 0.5s ease-out 0.2s both',
  			slideUp: 'slideUp 0.5s ease-out 0.3s both'
  		},
  		backgroundImage: {
  			'radial-light': 'radial-gradient(circle at center, rgba(173, 216, 230, 0.15) 0%, rgba(240, 248, 255, 0.05) 70%)',
  			'radial-dark': 'radial-gradient(circle at center, rgba(93, 173, 226, 0.05) 0%, transparent 70%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;