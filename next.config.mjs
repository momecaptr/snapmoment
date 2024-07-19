/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        resourceQuery: /url/, //.svg?url
        test: /.svg$/i
      },
      // Convert all other .svg imports to React components
      {
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if.svg?url
        test: /.svg$/i,
        use: ['@svgr/webpack']
      }
    );

    if (dev) {
      // Добавляем новое правило для обработки .module.scss файлов
      config.module.rules.push({
        test: /.module.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name][local]_[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      });

      // Добавляем правило для обычных .scss файлов
      config.module.rules.push({
        exclude: /.module.scss$/,
        test: /.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      });
    }
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /.svg$/i;

    return config;
  }
};

export default nextConfig;
