const currentEnv = process.env.NODE_ENV;

const modes = {
    production: {
        action: 'https://checkout.paycom.uz',
        merchandId: "uK5P5cKZwAkM7wznzI90OdKEfnf9ErYfMfvt",
    },
    development: {
        action: 'https://test.paycom.uz',
        merchandId: "5e4b7246af9572847bcace84",
        testKey: '&spY27IEMr5VBib1h7JVuyKXZUkDuE?HTfQX'
    }
}

export const payme = currentEnv == 'production' ? modes.production : modes.development;