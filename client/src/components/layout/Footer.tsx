import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="glass border-t border-white/10 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="text-2xl font-bold font-display tracking-wider text-white neon-text-secondary mb-4 block">
            NEON<span className="text-primary neon-text-primary">CRYPTO</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            The next generation of crypto asset management and bonus rewards. 
            Secure, decentralized, and built for the future.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold mb-4 text-white">Platform</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/bonus" className="hover:text-primary transition-colors">Claim Bonus</Link></li>
            <li><Link href="/" className="hover:text-primary transition-colors">Live Markets</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-white">Support</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Center</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Status</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-white">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
        © 2025 NeonCrypto. All rights reserved. Not financial advice.
      </div>
    </footer>
  );
}