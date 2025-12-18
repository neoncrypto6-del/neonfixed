import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 pt-20">
        <GlassCard className="w-full max-w-md border-primary/30">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold neon-text-primary mb-2">
              {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Enter your credentials to access your dashboard" : "Join the revolution today"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="John Doe" className="bg-black/20 border-white/10" required />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" placeholder="john@example.com" className="bg-black/20 border-white/10" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" placeholder="••••••••" className="bg-black/20 border-white/10" required />
            </div>

            <Button className="w-full bg-primary text-background font-bold h-11 neon-border-primary">
              {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </GlassCard>
      </main>
      <Footer />
    </div>
  );
}