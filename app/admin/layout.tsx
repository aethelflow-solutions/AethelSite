import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Aethel Flow Admin Portal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#05060a]">{children}</div>;
}
