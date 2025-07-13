import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === 'production';
const repo = 'Cocktails-Web-App'; // имя твоего репозитория

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
};

export default nextConfig;
