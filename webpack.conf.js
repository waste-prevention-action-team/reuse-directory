import path from 'path'
import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Visualizer from 'webpack-visualizer-plugin'

const MODE = JSON.stringify(process.env.NODE_ENV || 'development')

export default {
    target: 'web',

    mode: MODE === '"development"' ? 'development' : 'production',

    context: __dirname,

    devtool: MODE === '"development"' ? 'cheap-module-source-map' : 'source-map',

    entry: './src/index.jsx',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
        sourceMapFilename: 'js/[name].js.map',
        publicPath: MODE === '"development"' ? '/' : undefined,
        crossOriginLoading: 'anonymous'
    },

    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 3000,
        inline: true,
        publicPath: '/',
        stats: ['minimal', 'color'],
        allowedHosts: JSON.parse(process.env.ALLOWED_HOSTS || '["localhost"]'),
        headers: { 'Access-Control-Allow-Origin': '*' }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: MODE === '"development"',
                    cacheCompression: false
                }
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        modules: ['node_modules', './src'],
        extensions: ['.js', '.jsx']
    },

    optimization: {
        minimize: MODE !== '"development"'
    },

    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': MODE
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('.', 'src', 'index.html')
        })
    ].concat(
        MODE === '"development"' ?
            [
                new Webpack.NamedModulesPlugin(),
                new Webpack.NoEmitOnErrorsPlugin(),
                new Visualizer()
            ] :
            []
    )
}