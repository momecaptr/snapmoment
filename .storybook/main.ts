import type { StorybookConfig } from '@storybook/nextjs';

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

    const fileLoaderRule = config.module.rules.find((rule) => {
      if (rule && (rule as { test: RegExp }).test) {
        return (rule as { test: RegExp }).test.test?.('.svg');
      }
      return false;
    }) as {
      issuer: string;
      exclude: RegExp;
    };

    if (!fileLoaderRule) {
      throw new Error('fileLoaderRule is undefined');
    }
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        use: ['@svgr/webpack']
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  }
};
export default config;
