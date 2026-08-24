const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isGitHubActions ? "/OSI7_PJ" : "",
  assetPrefix: isGitHubActions ? "/OSI7_PJ" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
