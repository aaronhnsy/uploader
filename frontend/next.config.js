/** @type {import("next").NextConfig} **/
module.exports = {
    experimental: {
        typedRoutes: true,
    },
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "uploader.hnsy.dev" },
            { protocol: "https", hostname: "cdn.discordapp.com" },
        ],
    },
};
