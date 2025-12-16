import Navbar from "../components/Navbar";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-white pt-4">
        {children}
      </main>
    </>
  );
}
