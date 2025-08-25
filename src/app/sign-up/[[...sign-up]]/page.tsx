import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            VebTask
          </h1>
          <p className="text-slate-600">Create your account and start managing tasks</p>
        </div>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Having CAPTCHA issues?</strong> Try signing up with Google or GitHub below, or use a different browser.
                </p>
              </div>
            </div>
          </div>
          
          <SignUp 
            signInUrl="/sign-in"
            redirectUrl="/"
            afterSignUpUrl="/"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-white shadow-2xl border-0 rounded-3xl",
                headerTitle: "text-2xl font-bold text-slate-800",
                headerSubtitle: "text-slate-600", 
                socialButtonsBlockButton: "bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 font-medium",
                socialButtonsBlockButtonText: "font-medium",
                formFieldInput: "border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl",
                formButtonPrimary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold",
                footerActionLink: "text-blue-600 hover:text-blue-700",
                identityPreviewEditButton: "text-blue-600 hover:text-blue-700"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}