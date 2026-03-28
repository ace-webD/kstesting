/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'export',
   images: {
    unoptimized: true,   // ← add this line
  },
  /* config options here */
};

export default nextConfig;
