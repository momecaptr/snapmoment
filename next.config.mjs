/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        pathname: '**',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com'
      }
    ]
  }
};

export default nextConfig;
