/** @type {import('next').NextConfig} */
import i18nPKG from "./next-i18next.config.js";
const {i18n} = i18nPKG;
const nextConfig = {
  i18n,
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{loader :'@svgr/webpack', options: {icon: true}}],
    });
    return config; 
  }
};

export default nextConfig;
