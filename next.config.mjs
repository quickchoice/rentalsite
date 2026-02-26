/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_EXPORT === 'true';
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const basePath = rawBasePath && rawBasePath !== '/' ? rawBasePath : '';

const nextConfig = {
  ...(isStaticExport ? { output: 'export' } : {}),
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
