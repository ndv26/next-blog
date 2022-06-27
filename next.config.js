const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            env: {
                mongodb_username: "vuong260902",
                mongodb_password: "260902",
                mongodb_clustername: "cluster0",
                mongodb_database: "blog_dev",
            },
        };
    }

    return {
        reactStrictMode: true,
        env: {
            mongodb_username: "vuong260902",
            mongodb_password: "260902",
            mongodb_clustername: "cluster0",
            mongodb_database: "blog_production",
        },
    };
};

module.exports = nextConfig;
