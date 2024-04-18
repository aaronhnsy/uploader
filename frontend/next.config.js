/** @type {import("next").NextConfig} **/
module.exports = {
    experimental: {
        typedRoutes: true,
    },
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "uploader.axel.casa" },
            { protocol: "https", hostname: "cdn.discordapp.com" },
        ],
    },
};
