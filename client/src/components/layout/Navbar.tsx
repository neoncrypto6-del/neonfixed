import { Link, useLocation } from "wouter";
import { Wallet, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/bonus", label: "Claim Bonus" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors border border-primary/50 neon-border-primary">
            <Wallet className="w-6 h-6 text-primary neon-text-primary" />
          </div>
          <span className="text-2xl font-bold font-display tracking-wider text-white neon-text-secondary">
            NEON<span className="text-primary neon-text-primary">CRYPTO</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary neon-text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/auth">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary neon-border-primary cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 p-4 absolute w-full flex flex-col gap-4">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-lg font-medium ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/auth">
            <Button className="w-full bg-primary text-black hover:bg-primary/90">
              Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}