export default function MinerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-darkBlack min-h-screen">{children}</div>
    </>
  );
}
