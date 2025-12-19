import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StickyContact from "../components/stickyContact";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-white sm:p-2 lg:p-4">
        <Navbar />
        {children}
        <StickyContact />
        <Footer />
      </div>
    </>
  );
}
