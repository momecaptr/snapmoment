/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '**',
        protocol: 'https'
      }
    ]
  },
  reactStrictMode: false
};

export default nextConfig;
