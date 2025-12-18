import Navbar from "../components/Navbar";

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-white sm:p-2 lg:p-4">
        <Navbar />
        {children}
      </div>
    </>
  );
}
