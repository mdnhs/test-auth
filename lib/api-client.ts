// File: lib/api-client.ts
"use client";

import axios from "axios";
import { useSession } from "next-auth/react";

export function useApiClient() {
  const { data: session } = useSession();

  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
  });

  // Add JWT token to API requests if user is authenticated
  if (session?.user?.jwt) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${session.user.jwt}`;
  }

  return apiClient;
}
