import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/neon_cyberpunk_city_background_with_glass_structures.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-semibold mb-6 neon-border-primary">
            LIMITED TIME OFFER
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            GET <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text-primary">30% BONUS</span><br />
            ON YOUR ASSETS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Connect your wallet today and instantly boost your crypto portfolio. 
            Secure, fast, and verified across all major networks.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/bonus">
              <Button size="lg" className="bg-primary text-background hover:bg-primary/90 font-bold px-8 h-14 text-lg neon-border-primary rounded-full">
                CLAIM BONUS NOW
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 h-14 text-lg rounded-full">
                LEARN MORE
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}