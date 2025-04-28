"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Mineral } from "~~/components/dashboard/refiner/mineralListTable/types";
import UpdateMineralForm from "~~/components/dashboard/refiner/updateMineralForm";

export default function Page() {
  const params = useParams();
  const [mineral, setMineral] = useState<Mineral | null>(null);

  const handleUpdateMineral = async () => {
    // some update mineral logic here
  };

  return <UpdateMineralForm mineral={mineral || undefined} onSubmit={handleUpdateMineral} />;
}
