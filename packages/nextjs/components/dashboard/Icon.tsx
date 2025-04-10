import Image from "next/image";

interface IconProps {
  path: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function Icon({ path, alt, width = 22, height = 22 }: IconProps) {
  return <Image src={path} alt={alt} width={width} height={height} />;
}
