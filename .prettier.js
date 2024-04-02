module.exports = {
    tabWidth: 4,
    singleQuote: true,
    jsxSingleQuote: false,
    trailingComma: 'es5',
    printWidth: 100,
    quoteProps: 'consistent',
    twigFollowOfficialCodingStandards: true,
    twigPrintWidth: 100,
    phpVersion: '8.2',
    plugins: ['./node_modules/prettier-plugin-twig-melody'],
    overrides: [
        {
            files: '*.twig',
            options: {
                parser: 'melody',
            },
        },
        {
            files: '*.scss',
            options: {
                tabWidth: 2,
                printWidth: 80,
            },
        },
        {
            files: '*.yml',
            options: {
                tabWidth: 2,
                printWidth: 80,
            },
        },
    ],
};
