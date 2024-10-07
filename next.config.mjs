/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'www.fodors.com', '**', 'unsplash.com', "res.cloudinary.com"],
  },
};

export default nextConfig;
