import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image src="/dashboard/stone_proof_logo.svg" alt="stone proof logo" width={45} height={45} />
    </div>
  );
}
