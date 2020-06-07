module.exports = {
    apps : [{
        name: "major_produce_price",
        script: "./dist/script/major_produce_price.js",
        watch: false,
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}