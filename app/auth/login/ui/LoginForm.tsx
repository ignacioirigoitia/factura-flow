'use client'

import { useEffect, useState } from "react";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link"

import { authenticate } from "@/actions/auth/login";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoEye, IoEyeOff, IoInformation } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/auth/success');
    }
  }, [state])

  return (
    <form action={dispatch} className="mt-8 space-y-6">
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Correo electronico"
          />
        </div>
        <PasswordInput />
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>

      {state === 'Invalid credentials.' && (
        <div className="flex flex-row mb-2">
          <IoInformation className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">Credenciales invalidas</p>
        </div>
      )}

      <LoginButton />
    </form>
  )
}

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Label htmlFor="password" className="sr-only">
        Password
      </Label>
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        required
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Contraseña"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? (
          <IoEyeOff className="h-5 w-5" aria-hidden="true" />
        ) : (
          <IoEye className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {pending ? "Cargando..." : "Iniciar sesión"}
    </Button>
  )
}
