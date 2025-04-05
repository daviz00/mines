/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better performance
  output: 'export',

  // Disable server components since this is a client-side game
  reactStrictMode: true,

  // Configure images for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
