export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">VebTask</h1>
        <p className="text-lg mb-8">Task management application</p>
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <p className="text-gray-600">
            Application is ready for deployment on Railway!
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Configure your environment variables:
            <br />
            • NEXT_PUBLIC_CONVEX_URL
            <br />
            • NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
            <br />
            • CLERK_SECRET_KEY
          </p>
        </div>
      </div>
    </main>
  )
}