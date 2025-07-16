import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubPages ? `Cocktails-Web-App` : '',
  assetPrefix: isGithubPages ? `Cocktails-Web-App/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
