import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Download } from "lucide-react";
import { useState } from "react";

export default function BonusSuccess() {
  const [copied, setCopied] = useState(false);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=NeonCrypto-Bonus-Claim-${Date.now()}`;
  const bonusCode = `NC${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bonusCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-20 px-4 flex items-center justify-center">
        <div className="container mx-auto max-w-2xl">
          <GlassCard className="border-primary/30 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-green-500/10 border border-green-500/30 neon-border-primary">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
            </div>

            {/* Congratulations */}
            <h1 className="text-4xl md:text-5xl font-black mb-3 neon-text-secondary">
              CONGRATULATIONS!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your 30% bonus has been successfully claimed and is being processed.
            </p>

            {/* Bonus Details */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12 bg-black/20 p-6 rounded-lg border border-white/5">
              <div>
                <p className="text-xs text-muted-foreground mb-1">BONUS AMOUNT</p>
                <p className="text-2xl md:text-3xl font-bold text-green-500">+30%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">BONUS CODE</p>
                <p className="text-lg md:text-xl font-mono font-bold text-primary">{bonusCode}</p>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="mb-12">
              <p className="text-sm font-medium text-muted-foreground mb-4">VERIFICATION QR CODE</p>
              <div className="flex justify-center mb-4 p-6 bg-white rounded-lg">
                <img 
                  src={qrCodeUrl}
                  alt="Bonus Verification QR Code"
                  className="w-60 h-60 object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Scan this QR code to verify your bonus claim or keep it for your records.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button 
                onClick={handleCopy}
                className="w-full px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <span>{copied ? "✓ Copied!" : "Copy Bonus Code"}</span>
              </button>
              
              <a 
                href={qrCodeUrl}
                download
                className="w-full px-6 py-3 bg-secondary/10 border border-secondary/30 text-secondary rounded-lg hover:bg-secondary/20 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download QR Code
              </a>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mb-8">
              <p className="text-xs text-blue-400/90">
                <strong>Next Steps:</strong> Your bonus will be transferred to your connected wallet within 24 hours. 
                You'll receive a confirmation email with transaction details.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Link href="/" className="flex-1">
                <Button className="w-full bg-primary text-background hover:bg-primary/90 font-bold">
                  Back to Home
                </Button>
              </Link>
              <Link href="/auth" className="flex-1">
                <Button variant="outline" className="w-full border-white/20 hover:bg-white/5 font-bold">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}