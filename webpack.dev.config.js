const webpack = require('webpack');
const config = require('./webpack.config.js');

const port = process.env.PORT || 3001;

const devConfig = {
    ...config,
    mode: 'development',
    devServer: {
        port,
        publicPath: '/',
        contentBase: '/',
        hot: true,
        historyApiFallback: true
    }
};
devConfig.plugins.push(
    new webpack.DefinePlugin({
        BASE_BACKEND_URL: JSON.stringify('http://localhost:8080/api'),
        BASE_STATIC_URL: JSON.stringify('http://localhost:8081'),
    }),
);

module.exports = devConfig;
