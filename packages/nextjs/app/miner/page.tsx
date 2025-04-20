import { redirect } from "next/navigation";

export default function Page() {
  redirect("/miner/overview");
  return null;
}
