import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        ppr: 'incremental', // Active le PPR de manière incrémentale
    },
};

export default nextConfig;
