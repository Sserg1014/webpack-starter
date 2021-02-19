module.exports = {
    plugins: [
        'autoprefixer',
        'css-mqpacker',
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        }),
    ]
};