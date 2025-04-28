import { redirect } from "next/navigation";

export default function Page() {
  redirect("/transporter/overview");
  return null;
}
