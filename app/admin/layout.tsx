import type { Metadata } from "next";
import { UserContextProvider } from "@/context/userContextProvider";
import AdminShell from "./components/AdminShell";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Aethel Flow Admin Portal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <AdminShell>{children}</AdminShell>
    </UserContextProvider>
  );
}
