import type { Metadata } from "next";
import { Header } from "@/components/shared/header";

export const metadata: Metadata = {
  title: {
    template: "%s | Just Toss",
    default: "Головна | Just Toss",
  },
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="h-[1px] w-full bg-gray-300" />
      {children}
    </main>
  );
}
