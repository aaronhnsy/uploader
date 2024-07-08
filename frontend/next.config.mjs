/** @type {import("next").NextConfig} **/
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "uploader.hnsy.dev" },
            { protocol: "https", hostname: "cdn.discordapp.com" },
            { protocol: "http", hostname: "localhost" },
        ],
    },
};
export default nextConfig;
