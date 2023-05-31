/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		appDir: true
	},
	env: {
		API_HOST: process.env['API_HOST'],
		API_PORT: process.env['API_PORT']
	},
	images: {
		domains: ['http://localhost:3001']
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/news',
				permanent: true
			}
		];
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://${process.env['API_HOST']}:${process.env['API_PORT']}/api/:path*`
			},
			{
				source: '/uploads/:path*',
				destination: `http://${process.env['API_HOST']}:${process.env['API_PORT']}/uploads/:path*`
			}
		];
	}
};

module.exports = nextConfig;
