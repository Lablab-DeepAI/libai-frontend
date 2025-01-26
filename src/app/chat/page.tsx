import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Chat from "./Chat";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  return <Chat />;
}
