import { BuildOptions } from './types/type';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildPlugins } from './buildPlugins';
import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';

export const buildWebpackConfig = (
  option: BuildOptions
): webpack.Configuration => {
  const { path, mode, isDev } = option;
  return {
    entry: path.entry,
    mode: mode,
    module: {
      rules: buildLoaders(isDev),
    },
    resolve: buildResolvers(option),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(option) : undefined,
    output: {
      filename: '[contenthash].[name].js',
      path: path.build,
      clean: true,
    },
    plugins: buildPlugins(path, isDev),
  };
};
