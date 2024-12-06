import { auth } from "@/auth.config"
import { LoginForm } from "./ui/LoginForm"
import { redirect } from "next/navigation";

export default async function LoginPage() {

  const session = await auth();

  if(session){
    redirect('/auth/success');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side - Logo and Company Name */}
      <div className="hidden w-2/5 bg-blue-600 lg:flex lg:items-center lg:justify-center">
        <div className="text-center">
          <svg
            className=" h-20 w-20 mx-auto text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M3 15h6" />
            <path d="M3 18h6" />
            <path d="M3 21h6" />
          </svg>
          <h1 className="mt-4 text-4xl font-bold text-white">FacturaFlow</h1>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}