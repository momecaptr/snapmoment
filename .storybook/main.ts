import type { StorybookConfig } from '@storybook/nextjs';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  webpackFinal: async (config) => {
    if (!config.module || !config.module.rules) {
      throw new Error('config.module or config.module.rules is undefined');
    }

    config.resolve = config.resolve || {};

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src')
    };
    // Добавьте обработчик для next/image
    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|svg)$/i,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         name: '[name].[ext]',
    //         outputPath: 'static/media',
    //         publicPath: '/static/media'
    //       }
    //     }
    //   ]
    // });

    return config;
  }
};

export default config;
