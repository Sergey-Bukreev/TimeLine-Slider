import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { BuildPath } from './types/type';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export const buildPlugins = (
  paths: BuildPath,
  isDev: boolean
): webpack.WebpackPluginInstance[] => {
  const plugins: (webpack.WebpackPluginInstance | false)[] = [
    new HtmlWebpackPlugin({ template: paths.html }),
    isDev && new webpack.ProgressPlugin(),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    isDev && new ForkTsCheckerWebpackPlugin(),
    isDev && new ReactRefreshPlugin(),
  ];

  return plugins.filter((plugin): plugin is webpack.WebpackPluginInstance =>
    Boolean(plugin)
  );
};
