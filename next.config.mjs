/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com'
      },
      {
        hostname: 'gallerease.s3.us-west-2.amazonaws.com'
      },
      {
        hostname: 'd27g89h04fuxs7.cloudfront.net'
      }
    ],
  },
};

export default nextConfig; 
