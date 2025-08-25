'use client'

import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'
import { useAuth } from '@clerk/nextjs'

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL || 'https://chatty-mole-654.convex.cloud'
)

export default function ConvexClientProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const auth = useAuth()
  
  const useAuthForConvex = () => ({
    isLoaded: auth.isLoaded,
    isSignedIn: auth.isSignedIn,
    getToken: async (options?: { template?: "convex"; skipCache?: boolean }) => {
      return await auth.getToken({ template: options?.template })
    },
    orgId: auth.orgId,
    orgRole: auth.orgRole
  })

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuthForConvex}>
      {children}
    </ConvexProviderWithClerk>
  )
}