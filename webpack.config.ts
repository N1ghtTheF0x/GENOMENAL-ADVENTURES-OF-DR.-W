import { resolve } from "path"

import { Configuration } from "webpack"
import * as HtmlWebpackPlugin from "html-webpack-plugin"

const TEXT_FILES = /\.(txt|frag|vert)$/
const IMAGE_FILES = /\.(png|jpe?g)$/

function configure(): Configuration
{
    const config: Configuration = {
        entry: "./source/index.ts",
        devtool: "source-map",
        output: {
            filename: "main.js",
            clean: true,
            path: resolve(__dirname,"docs")
        },
        resolve: {
            extensions: [".ts",".js",".mjs",".mts"]
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.m?ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env","@babel/preset-typescript"]
                        }
                    }
                },
                {
                    test: IMAGE_FILES,
                    type: "asset/resource",
                    generator: {
                        filename: "images/[hash][ext][query]"
                    }
                },
                {
                    test: TEXT_FILES,
                    type: "asset/source",
                    generator: {
                        filename: "text/[hash][ext][query]"
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin()
        ]
    }

    return config
}

export default configure