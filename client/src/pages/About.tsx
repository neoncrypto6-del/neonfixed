import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 neon-text-secondary">ABOUT NEON<span className="text-primary">CRYPTO</span></h1>
          </div>

          <div className="grid gap-8">
            <GlassCard>
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                NeonCrypto was founded with a singular vision: to democratize crypto rewards. 
                We believe that holding assets should be rewarding in itself. By leveraging our 
                proprietary high-frequency trading algorithms and liquidity pools, we are able 
                to offer an unprecedented 30% bonus on connected assets to early adopters.
              </p>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard>
                <h3 className="text-xl font-bold mb-3">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  Our platform utilizes military-grade encryption and is audited by top security firms. 
                  Your assets never leave your wallet; we simply verify ownership to distribute rewards via smart contracts.
                </p>
              </GlassCard>
              
              <GlassCard>
                <h3 className="text-xl font-bold mb-3">Instant Liquidity</h3>
                <p className="text-sm text-muted-foreground">
                  Bonuses are paid out in real-time. Our bridge technology ensures that you can access your funds 
                  across any chain instantly without waiting periods.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}