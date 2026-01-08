import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Enable static image imports from public folder
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
