import { GlassCard } from "@/components/ui/GlassCard";
import walletBanner from "@assets/generated_images/collage_of_crypto_wallet_logos_for_landing_page.png";

export function WalletGrid() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text-secondary">SUPPORTED WALLETS</h2>
          <p className="text-muted-foreground">We support all major wallets for instant bonus integration</p>
        </div>

        <GlassCard className="p-8 md:p-12 border-primary/20">
            <div className="w-full h-auto overflow-hidden rounded-lg">
                 <img 
                    src={walletBanner} 
                    alt="Supported Wallets: MetaMask, Trust Wallet, Exodus, Ledger, Coinbase" 
                    className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
                {['MetaMask', 'Trust Wallet', 'Exodus', 'Coinbase', 'Binance', 'Ledger', 'Rainbow', 'Coinmama'].map((wallet) => (
                    <div key={wallet} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-colors">
                        <span className="font-display font-bold tracking-widest text-lg">{wallet}</span>
                    </div>
                ))}
            </div>
        </GlassCard>
      </div>
    </section>
  );
}