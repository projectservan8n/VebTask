/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL || 'https://chatty-mole-654.convex.cloud',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_cm9idXN0LWJveGVyLTc5LmNsZXJrLmFjY291bnRzLmRldiQ',
  },
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs'],
  },
  output: 'standalone',
}