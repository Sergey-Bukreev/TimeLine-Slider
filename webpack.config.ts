import path from 'path';
import { BuildEnv, BuildMode, BuildPath } from './config/build/types/type';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
  const buildPath: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };
  const mode: BuildMode = env.mode || 'development';
  const isDev = mode === 'development';
  const PORT = env.port || 3000;

  return buildWebpackConfig({
    isDev,
    mode,
    path: buildPath,
    port: PORT,
  });
};
