"use client";
import * as React from "react";
import { getUserDetail } from "./action";
import { redirect } from "next/navigation";

interface UserAccount {
  id: string;
  aud: string;
  role?: string | undefined;
  email?: string | undefined;
  email_confirmed_at?: string | undefined;
  phone?: string | undefined;
  confirmed_at?: string | undefined;
  recovery_sent_at?: string | undefined;
  last_sign_in_at?: string | undefined;
  app_metadata?: Record<string, unknown>;
  user_metadata?: {
    displayName?: string; // Optional property
    [key: string]: unknown; // Allow additional properties
  };
  created_at: string | undefined;
  updated_at?: string | undefined;
  is_anonymous?: boolean | undefined;
}

export default function Page() {
  const [user, setUser] = React.useState<UserAccount | null>(null);
  React.useEffect(() => {
    async function fetchUser() {
      const userInfo = await getUserDetail();
      setUser(userInfo);
    }
    fetchUser();
  }, []);

  if (user && Object.keys(user).length > 0) {
    return redirect("/dashboard");
  }
}
