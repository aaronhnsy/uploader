const path = require("path");

/** @type {import("next").NextConfig} **/
module.exports = {
    experimental: {
        typedRoutes: true,
        serverActions: true,
    },
    sassOptions: {
        includePaths: [
            path.join(__dirname, "styles"),
        ],
    },
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "placehold.co"},
            {protocol: "https", hostname: "uploader.axel.casa"},
        ],
    },
};
