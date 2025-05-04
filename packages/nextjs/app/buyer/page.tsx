import { redirect } from "next/navigation";

export default function Page() {
  redirect("/buyer/overview");
  return null;
}
