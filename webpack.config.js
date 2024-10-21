import path from 'path';

const isDev = process.env.NODE_ENV === 'development';
const isCls = process.env.OUTPUT_TYPE === 'cls';

const outputFilename = isCls ? 'cls.js' : 'bundle.js';
const mode = isDev ? 'development' : 'production';

export default {
    target: 'node',
    mode: mode,
    entry: isCls ? './src/cluster.ts' : './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    watch: isDev,
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: outputFilename,
        path: path.resolve('dist'),
        chunkFormat: 'module',
        module: true,
    },
    experiments: {
        outputModule: true,
    },
};