const path = require("path")

/** @type {import("next").NextConfig} **/
module.exports = {
    experimental: {
        appDir: true,
        typedRoutes: true,
    },
    sassOptions: {
        includePaths: [
            path.join(__dirname, "styles"),
        ],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
                pathname: "/32.png",
            },
        ],
    },
}
