const path = require('path');
const Dotenv = require('dotenv-webpack');

const next_config = {
    webpack: config => {
        config.plugins = config.plugins || [];

        config.plugins = [
            ...config.plugins,
            // Read the .env file
        ];

        return config;
    },
}

module.exports = {
    ...next_config, 
    async redirects() {
        return [
            {
                source: '/about',
                destination: '/',
                permanent: true,
            },
        ]
    },
    env : {
        CONTENTFUL_SPACE:"ayaqw4ri6qlp",
        CONTENTFUL_TOKEN:"LeSE5FXyc3zbLi-tPJbcw_dn88qLIdqUlUYv-Q2FClw",
        MAILCHIMP_API_KEY:"cf5488b5ada2f48735e0bcc2169d2204-us17",
        MAILCHIMP_SERVER_PREFIX : "us17",
        MAILCHIMP_LIST_ID : "eade3795f0",
        TWILIO_ACCOUNT_SID: "AC03623229dba462b92876e9bec4f98181",
        TWILIO_AUTH_KEY : "005bd078cc1cc22a5eb099af3916ed3b",
        CLOZE_API_KEY : "0c1a695d08bb40831679c0e87ef9856b",
    }
};
