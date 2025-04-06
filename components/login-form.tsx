// File: components/login-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setError(null);
  
    const result = await signIn('credentials', {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
      callbackUrl: '/dashboard', // Explicit callback
    });
  
    setIsLoading(false);
  
    if (result?.error) {
      setError(result.error === 'CredentialsSignin'
        ? 'Invalid email or password'
        : 'Login failed. Please try again.'
      );
      return;
    }
  
    if (result?.url) {
      window.location.href = result.url; // Full page reload to ensure auth state updates
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-2 text-gray-600">Enter your credentials to access your account</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-white bg-red-500 rounded">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="identifier" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="identifier"
            type="email"
            {...register("identifier")}
            className="w-full px-3 py-2 border rounded-md"
            disabled={isLoading}
          />
          {errors.identifier && (
            <p className="text-sm text-red-500">{errors.identifier.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-md"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}