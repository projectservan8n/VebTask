import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            VebTask
          </h1>
          <p className="text-slate-600">Welcome back to your task management workspace</p>
        </div>
        <div className="space-y-4">
          <SignIn 
            signUpUrl="/sign-up"
            redirectUrl="/"
            afterSignInUrl="/"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-white shadow-2xl border-0 rounded-3xl",
                headerTitle: "text-2xl font-bold text-slate-800",
                headerSubtitle: "text-slate-600",
                socialButtonsBlockButton: "bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50",
                formFieldInput: "border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl",
                formButtonPrimary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold",
                footerActionLink: "text-blue-600 hover:text-blue-700"
              }
            }}
          />
          
          <div className="text-center">
            <p className="text-slate-600 text-sm">
              Having trouble with sign-up? Try our{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium underline">
                CAPTCHA-free registration
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}