const currentEnv = process.env.NODE_ENV;

const modes = {
    production: {
        id: '656151361204007',
    },
    development: {
        id: '2496083423969818',
    }
}

export const fblogin = currentEnv == 'production' ? modes.production.id : modes.development.id;