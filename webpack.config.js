const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const src = path.join(__dirname, 'src');
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash:8].js',
        publicPath: '/',
    },
    resolve: {
        alias: {
            'components': path.join(src, 'components'),
            'store': path.join(src, 'store'),
        },
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: path.join(__dirname, '/dist/index.html'),
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port,
        publicPath: '/',
        contentBase: '/',
        hot: true,
        historyApiFallback: true
    },
    optimization: {
        minimize: true,
    }
};
