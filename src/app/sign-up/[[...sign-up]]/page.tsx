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

        {/* CAPTCHA Warning */}
        <div className="backdrop-blur-xl bg-amber-500/10 border border-amber-400/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-amber-100 text-sm font-medium">
                <strong>Having CAPTCHA issues?</strong> Try signing up with Google/GitHub below, or use our{' '}
                <a href="/register" className="underline decoration-2 underline-offset-2 hover:text-amber-200 transition-colors">
                  CAPTCHA-free registration
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