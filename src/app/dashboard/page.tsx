import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AppLayout from "@/layouts/app-layout";
import RealTimeInternetSpeed from "@/components/internet-check";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <AppLayout>
      <>
        <RealTimeInternetSpeed />
      </>
    </AppLayout>
  );
}
