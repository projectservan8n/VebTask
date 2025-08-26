import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="sign-in-page min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* VebTask Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-3 drop-shadow-lg">
            VebTask
          </h1>
          <p className="text-white/80 text-lg font-medium">Welcome back to your workspace</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Glassmorphism Container */}
        <div className="w-full max-w-md mx-auto">
          <SignIn 
            signUpUrl="/sign-up"
            redirectUrl="/"
            afterSignInUrl="/"
          />
        </div>
        
        {/* Fallback Registration Link */}
        <div className="text-center mt-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Having trouble with sign-up? Try our{' '}
              <a href="/register" className="text-blue-300 hover:text-blue-200 font-medium underline decoration-2 underline-offset-2 transition-all duration-300 hover:decoration-blue-200">
                CAPTCHA-free registration
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}