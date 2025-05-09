import { redirect } from "next/navigation";

export default function Page() {
  redirect("/auditor/overview");
  return null;
}
