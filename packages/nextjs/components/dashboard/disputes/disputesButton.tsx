import Link from "next/link";

interface DisputeButtonProps {
  count: number;
}

export const DisputeButton = ({ count }: DisputeButtonProps) => {
  return (
    <Link href="/disputes">
      <button className="flex items-center gap-2 px-4 py-2 bg-[#252525] border border-[#323539] text-white rounded-lg font-medium hover:bg-[#2d333d] transition-colors">
        Ongoing Disputes
        {count > 0 && (
          <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full">
            {count}
          </span>
        )}
      </button>
    </Link>
  );
};
