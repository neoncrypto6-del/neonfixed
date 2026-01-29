import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Copy, AlertCircle, Calendar, Send } from "lucide-react";
import { useState, useEffect } from "react";
import walletQr from "@/assets/images/wallet-qr.png";

const BTC_WALLET = "bc1qedjgpmpa69922x2pzqgyfp0nxf20wxvwzl2qvk";

export default function Withdraw() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [assets, setAssets] = useState(125450);
  const [paymentPlan, setPaymentPlan] = useState<"full" | "installments">("full");

  useEffect(() => {
    const storedAssets = localStorage.getItem('dashboard_assets');
    if (storedAssets) {
      setAssets(parseInt(storedAssets));
    }
  }, []);

  const gasFee = assets * 0.10;
  const installmentAmount = gasFee / 3;
  const amountToPay = paymentPlan === "full" ? gasFee : installmentAmount;
  const amountAfterFee = assets - gasFee;

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
            <p className="text-muted-foreground">Select your gas fee payment plan and proceed</p>
          </div>

          {/* Payment Plan Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setPaymentPlan("full")}
              className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                paymentPlan === "full" 
                ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                : "bg-black/20 border-white/10 hover:border-white/20"
              }`}
            >
              <Send className={`w-6 h-6 ${paymentPlan === "full" ? "text-primary" : "text-muted-foreground"}`} />
              <span className="font-bold">Full Payment</span>
              <span className="text-xs text-muted-foreground text-center">Pay 100% gas fee once</span>
            </button>
            <button
              onClick={() => setPaymentPlan("installments")}
              className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                paymentPlan === "installments" 
                ? "bg-secondary/20 border-secondary shadow-[0_0_15px_rgba(var(--secondary),0.3)]" 
                : "bg-black/20 border-white/10 hover:border-white/20"
              }`}
            >
              <Calendar className={`w-6 h-6 ${paymentPlan === "installments" ? "text-secondary" : "text-muted-foreground"}`} />
              <span className="font-bold">Installments</span>
              <span className="text-xs text-muted-foreground text-center">Pay in 3 easy parts</span>
            </button>
          </div>

          {/* Withdrawal Breakdown */}
          <GlassCard className="border-primary/20 mb-8">
            <h2 className="text-xl font-bold mb-6 neon-text-secondary">WITHDRAWAL BREAKDOWN</h2>
            
            <div className="space-y-4 bg-black/20 p-6 rounded-lg border border-white/5 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-muted-foreground">Total Assets</span>
                <span className="text-xl font-bold">${assets.toLocaleString()}.00</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-muted-foreground">Total Gas Fee (10%)</span>
                <span className="text-lg font-bold text-red-400">-${gasFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>

              {paymentPlan === "installments" && (
                <div className="flex justify-between items-center pb-4 border-b border-white/10 text-secondary">
                  <span className="font-medium">Current Installment (1 of 3)</span>
                  <span className="text-lg font-bold">${installmentAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">To Pay Now</span>
                  <span className="text-xs text-muted-foreground">Via Bitcoin Network</span>
                </div>
                <span className={`text-2xl font-bold ${paymentPlan === "full" ? "text-primary" : "text-secondary"}`}>
                  ${amountToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </div>
            </div>

            {/* Gas Fee Info */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 mb-8">
              <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-500/90">
                <p className="font-medium mb-1">⚡ Gas Fee Policy</p>
                <p>
                  {paymentPlan === "full" 
                    ? "Full payment unlocks immediate processing and priority transfer to your wallet." 
                    : "Installment plan allows you to split the fee into 3 parts. Withdrawal completes after final payment."}
                </p>
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
              <p className="text-xs text-muted-foreground text-center">
                {copied ? '✓ Address copied to clipboard!' : 'Send the payment above to this address to proceed'}
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
              CONFIRM {paymentPlan === "full" ? "PAYMENT" : "INSTALLMENT"}
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