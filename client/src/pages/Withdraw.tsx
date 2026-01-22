import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Copy, AlertCircle } from "lucide-react";
import { useState } from "react";
import walletQr from "@/assets/images/wallet-qr.png";

const BTC_WALLET = "bc1qedjgpmpa69922x2pzqgyfp0nxf20wxvwzl2qvk";

export default function Withdraw() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);

  // Example total assets (would come from dashboard state in real app)
  const totalAssets = 125450;
  const gasFee = (totalAssets * 0.10).toFixed(2);
  const amountAfterFee = (totalAssets - parseFloat(gasFee)).toFixed(2);

  const handleCopy = () => {
    navigator.clipboard.writeText(BTC_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-10">
            <button 
              onClick={() => setLocation("/dashboard")}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl md:text-5xl font-black neon-text-primary mb-2">WITHDRAW FUNDS</h1>
            <p className="text-muted-foreground">Withdraw your assets with automatic gas fee calculation</p>
          </div>

          {/* Withdrawal Breakdown */}
          <GlassCard className="border-primary/20 mb-8">
            <h2 className="text-xl font-bold mb-6 neon-text-secondary">WITHDRAWAL BREAKDOWN</h2>
            
            <div className="space-y-4 bg-black/20 p-6 rounded-lg border border-white/5 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-muted-foreground">Total Assets</span>
                <span className="text-xl font-bold">${totalAssets.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-muted-foreground">Gas Fee (10% - Bitcoin Network)</span>
                <span className="text-lg font-bold text-red-400">-${gasFee}</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-white">Amount to Receive</span>
                <span className="text-2xl font-bold text-green-400">${amountAfterFee}</span>
              </div>
            </div>

            {/* Gas Fee Info */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 mb-8">
              <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-500/90">
                <p className="font-medium mb-1">⚡ Gas Fee Notice</p>
                <p>A 10% gas fee is required to process your withdrawal through the Bitcoin network. This fee will be sent to the designated wallet address below.</p>
              </div>
            </div>
          </GlassCard>

          {/* Bitcoin Wallet Address */}
          <GlassCard className="border-secondary/20 mb-8 text-center">
            <h2 className="text-xl font-bold mb-6 neon-text-secondary">BITCOIN NETWORK GAS FEE WALLET</h2>
            
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white rounded-xl shadow-2xl">
                <img 
                  src={walletQr} 
                  alt="Wallet QR Code" 
                  className="w-48 h-48"
                />
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div className="bg-black/20 p-6 rounded-lg border border-white/5">
                <p className="text-xs text-muted-foreground mb-3">WALLET ADDRESS (BTC)</p>
                <div className="flex items-center gap-3">
                  <code className="flex-grow text-sm font-mono bg-black/30 p-3 rounded border border-white/10 break-all text-primary">
                    {BTC_WALLET}
                  </code>
                  <button 
                    onClick={handleCopy}
                    className="p-3 rounded bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors flex-shrink-0"
                  >
                    <Copy className={`w-5 h-5 ${copied ? 'text-green-400' : 'text-primary'}`} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {copied ? '✓ Address copied to clipboard!' : 'Click the copy icon or scan the QR code'}
              </p>
            </div>
          </GlassCard>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/5 font-bold">
                CANCEL
              </Button>
            </Link>
            <Button className="flex-1 bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 font-bold cursor-not-allowed opacity-50">
              CONFIRM WITHDRAWAL
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Withdrawals are processed manually for security within 24 hours.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}