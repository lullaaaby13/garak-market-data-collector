module.exports = {
    apps : [{
        name: "convert_to_mariadb_major_produce_price",
        script: "./dist/script/convert_to_mariadb_major_produce_price.js",
        watch: false,
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}