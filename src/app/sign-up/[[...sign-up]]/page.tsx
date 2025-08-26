import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="sign-up-page min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* VebTask Logo and Branding */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="auth-logo w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <h1 className="auth-title text-6xl font-black mb-4">
            VebTask
          </h1>
          <p className="text-white text-xl font-medium mb-4">Get started</p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto shadow-lg"></div>
        </div>

        {/* Help Message */}
        <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-400/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium">
                <strong>Tip:</strong> Use Google or GitHub for faster signup, or try our{' '}
                <a href="/register" className="underline decoration-2 underline-offset-2 hover:text-blue-200 transition-colors">
                  simple registration
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Glassmorphism Container */}
        <div className="w-full max-w-md mx-auto">
          <SignUp 
            signInUrl="/sign-in"
            redirectUrl="/"
            afterSignUpUrl="/"
          />
        </div>
      </div>
    </div>
  )
}