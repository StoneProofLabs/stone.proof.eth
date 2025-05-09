import { redirect } from "next/navigation";

export default function Page() {
  redirect("/warehouse/overview");
  return null;
}
