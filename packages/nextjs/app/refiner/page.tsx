import { redirect } from "next/navigation";

export default function Page() {
  redirect("/refiner/overview");
  return null;
}
