import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WalletGrid } from "@/components/sections/WalletGrid";
import { CryptoPriceTable } from "@/components/sections/CryptoPriceTable";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WalletGrid />
        <CryptoPriceTable />
      </main>
      <Footer />
    </div>
  );
}