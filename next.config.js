const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {

	reactStrictMode: true,

	sassOptions: {
        includePaths: [
            path.join(__dirname, 'public/styles/')
        ]
    },

    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    }
}

module.exports = nextConfig