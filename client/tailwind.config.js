/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		container: {
			screens: {
				sm: '100%',
				md: '100%',
				lg: '100%',
				xl: '1200px'
			}
		},
		extend: {
			borderRadius: {
				xxs: '8px',
				xs: '10px',
				sm: '12px',
				md: '15px',
				lg: '20px',
				xl: '30px',
				full: '100vh'
			},
			colors: {
				black: '#000000',
				white: '#FFF',
				transparent: 'rgba(0,0,0,0)',
				accents: {
					red: '#E60023',
					like: '#ff3347',
					blue: {
						light: '#0077B5',
						dark: '#00a0fa'
					},
					gray: '#B5B5B5'
				},
				background: {
					light: '#DBE1E4',
					dark: '#141414'
				},
				block: {
					light: '#ffffff',
					dark: '#222222'
				},
				text: {
					inactive: '#656565',
					active: {
						light: '#0077B5',
						dark: '#50bfff'
					},
					default: '#ADADAD',
					accent: '#000000'
				},
				icon: {
					inactive: '#656565',
					active: {
						light: '#0077B5',
						dark: '#50bfff'
					}
				},
				hover: {
					light: '#e3e3e3',
					dark: 'rgba(68,68,68,0.46)'
				}
			}
		}
	},
	plugins: [
		require('tailwindcss-global-dark'),
		function ({ addComponents }) {
			addComponents({
				'.container': {
					maxWidth: '100%',
					margin: '0 auto',
					padding: '0 1rem',
					'@screen sm': {
						maxWidth: '100%',
						padding: '0 1rem'
					},
					'@screen md': {
						maxWidth: '100%',
						padding: '0 1rem'
					},
					'@screen lg': {
						maxWidth: '100%',
						padding: '0 1rem'
					},
					'@screen xl': {
						maxWidth: '1000px',
						padding: '0'
					}
				},
				'.center': {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}
			});
		}
	]
};
