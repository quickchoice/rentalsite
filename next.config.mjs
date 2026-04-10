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
    // Keep unoptimized for static exports; enable optimization in server mode for Core Web Vitals
    unoptimized: isStaticExport
  },
  ...(!isStaticExport
    ? {
        async redirects() {
          return [
            // /how-it-works is now an inline section on the homepage
            { source: '/how-it-works', destination: '/', permanent: true },
            // Empty cart should bounce users back to browse, not a dead-end page
            { source: '/empty-cart', destination: '/category/baby', permanent: false }
          ];
        }
      }
    : {})
};

export default nextConfig;
