import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AppLayout from "@/layouts/app-layout";
import FileUploader from "./FileUploader";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">
        School Resources Uploader (PDF, TXT, PPT, PPTX - Max 20MB)
      </h1>
      <FileUploader />
    </AppLayout>
  );
}
