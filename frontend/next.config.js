const path = require("path");

/**
 * @type {import("next").NextConfig}
 **/
module.exports = {
    experimental: {
        typedRoutes: true,
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
            {protocol: "https", hostname: "www.billboard.com"},
            {protocol: "https", hostname: "lastfm.freetls.fastly.net"},
        ],
    },
};
