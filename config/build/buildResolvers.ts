import webpack from 'webpack';
import { BuildOptions } from './types/type';

export const buildResolvers = (options: BuildOptions): webpack.ResolveOptions => {
  return {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
    alias: {
      '@': options.path.src,
    },
  };
};
