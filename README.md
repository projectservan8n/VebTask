# OrbiTask AI

A modern task management application built with Next.js, Convex.dev for the database, and Clerk.com for authentication.

## Features

- ✅ User authentication with Clerk
- 📝 Create, read, update, and delete tasks
- 🔄 Real-time updates with Convex
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: Convex.dev (real-time database)
- **Authentication**: Clerk.com
- **Styling**: Tailwind CSS
- **Deployment**: Ready for Vercel

## Setup Instructions

### 1. Clone and Install

```bash
cd orbitask-ai-main
npm install
```

### 2. Set up Convex

1. Sign up at [convex.dev](https://convex.dev)
2. Install Convex CLI: `npm install -g convex`
3. Login to Convex: `npx convex login`
4. Initialize your Convex project: `npx convex dev --configure`
5. Copy the deployment URL to your `.env.local` file

### 3. Set up Clerk

1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key to your `.env.local` file

### 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your-convex-deployment-url-here
CONVEX_DEPLOY_KEY=your-convex-deploy-key-here

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key-here
CLERK_SECRET_KEY=your-clerk-secret-key-here
```

### 5. Run Development Server

```bash
# Start Convex backend
npm run convex

# In another terminal, start Next.js
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
├── convex/                 # Convex backend functions
│   ├── schema.ts          # Database schema
│   ├── tasks.ts           # Task CRUD operations
│   └── users.ts           # User management
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── layout.tsx     # Root layout with providers
│   │   ├── page.tsx       # Main application page
│   │   └── globals.css    # Global styles
│   └── lib/
│       └── convex.ts      # Convex client setup
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run convex` - Start Convex development server
- `npm run lint` - Run ESLint

## Deployment

1. Deploy to Vercel:
   - Connect your repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

2. Deploy Convex:
   - Run `npx convex deploy` to deploy your backend
   - Update environment variables with production URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request