import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <Footer />
      </div>
    </>
  );
}
