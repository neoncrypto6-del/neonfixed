import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { LogOut, Wallet, TrendingUp, Settings, Bell, Send } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [userStats, setUserStats] = useState({
    totalAssets: "$0.00",
    bonusEarned: "$0.00",
    activeWallets: 3,
    pendingClaims: 1
  });

  useEffect(() => {
    // Get last claim email to use as a seed for the random values
    // This ensures that the same email always gets the same balance
    const lastClaim = localStorage.getItem('last_claim');
    let email = "default";
    if (lastClaim) {
      email = JSON.parse(lastClaim).email;
    }

    // Simple deterministic pseudo-random generator based on email string
    const getSeed = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };

    const seed = getSeed(email);
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    const randomAssets = Math.floor(seededRandom(seed) * (500000 - 50000) + 50000);
    const randomBonus = Math.floor(randomAssets * 0.30);
    
    // Save to localStorage so Withdraw page can access the exact same numbers
    localStorage.setItem('dashboard_assets', randomAssets.toString());

    setUserStats({
      totalAssets: `$${randomAssets.toLocaleString()}.00`,
      bonusEarned: `$${randomBonus.toLocaleString()}.00`,
      activeWallets: (seed % 5) + 1,
      pendingClaims: seed % 3
    });
  }, []);

  const handleLogout = () => {
    setLocation("/");
  };

  const handleWithdraw = () => {
    setLocation("/withdraw");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black neon-text-primary mb-2">DASHBOARD</h1>
              <p className="text-muted-foreground">Welcome back, Crypto Investor</p>
            </div>
            <div className="flex gap-3">
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <Button 
                onClick={handleLogout}
                className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <GlassCard className="border-primary/20 relative group">
              <p className="text-xs text-muted-foreground mb-2 font-display">TOTAL ASSETS</p>
              <p className="text-2xl font-bold mb-1 neon-text-secondary">{userStats.totalAssets}</p>
              <p className="text-xs text-green-500 mb-4">↑ 2.4% today</p>
              <Button 
                onClick={handleWithdraw}
                size="sm"
                className="w-full bg-accent text-white font-bold h-9 neon-border-primary"
              >
                <Send className="w-3 h-3 mr-2" />
                WITHDRAW
              </Button>
            </GlassCard>
            
            <GlassCard className="border-secondary/20">
              <p className="text-xs text-muted-foreground mb-2 font-display">BONUS EARNED</p>
              <p className="text-2xl font-bold mb-1 text-secondary">{userStats.bonusEarned}</p>
              <p className="text-xs text-green-500">↑ +$1,245 this week</p>
            </GlassCard>
            
            <GlassCard className="border-accent/20">
              <p className="text-xs text-muted-foreground mb-2 font-display">ACTIVE WALLETS</p>
              <p className="text-2xl font-bold mb-1 text-accent">{userStats.activeWallets}</p>
              <p className="text-xs text-muted-foreground">Connected</p>
            </GlassCard>
            
            <GlassCard className="border-primary/20">
              <p className="text-xs text-muted-foreground mb-2 font-display">PENDING CLAIMS</p>
              <p className="text-2xl font-bold mb-1 text-yellow-400">{userStats.pendingClaims}</p>
              <p className="text-xs text-yellow-500">Processing...</p>
            </GlassCard>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/5">
            {["overview", "wallets", "transactions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-primary text-primary neon-text-primary"
                    : "border-transparent text-muted-foreground hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="border-primary/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  Connected Wallets
                </h3>
                <div className="space-y-3">
                  {["MetaMask", "Trust Wallet", "Ledger"].map((wallet, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                      <span className="font-medium">{wallet}</span>
                      <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20">
                  + Add Wallet
                </Button>
              </GlassCard>

              <div className="space-y-6">
                <GlassCard className="border-secondary/20">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    Recent Activity
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Bonus Claim #12345</span>
                      <span className="text-green-400">+$1,250</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Wallet Connected</span>
                      <span className="text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Bonus Processed</span>
                      <span className="text-green-400">+$850</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Wallet Verified</span>
                      <span className="text-muted-foreground">1 day ago</span>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="border-accent/20">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5 text-accent" />
                    Withdraw Funds
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Withdraw your assets and bonuses to your wallet securely.
                  </p>
                  <Button 
                    onClick={handleWithdraw}
                    className="w-full bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 font-bold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    WITHDRAW NOW
                  </Button>
                </GlassCard>
              </div>
            </div>
          )}

          {/* Wallets Tab */}
          {activeTab === "wallets" && (
            <GlassCard className="border-primary/20">
              <h3 className="text-lg font-bold mb-4">Manage Wallets</h3>
              <div className="grid gap-4">
                {["MetaMask - 0x742d...f3B4", "Trust Wallet - 0x8f2D...a9C1", "Ledger - 0x1a3F...b2E8"].map((addr, i) => (
                  <div key={i} className="p-4 bg-black/20 rounded-lg border border-white/5 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{addr}</p>
                      <p className="text-xs text-muted-foreground">Assets: $41,483.33</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-primary/20 text-primary">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <GlassCard className="border-primary/20">
              <h3 className="text-lg font-bold mb-4">Transaction History</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-4 gap-4 p-3 border-b border-white/5 text-muted-foreground">
                  <span>Type</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span>Date</span>
                </div>
                {[
                  { type: "Bonus Claim", amount: "+$1,250", status: "Completed", date: "Today" },
                  { type: "Wallet Sync", amount: "-", status: "Completed", date: "Yesterday" },
                  { type: "Bonus Claim", amount: "+$850", status: "Completed", date: "2 days ago" },
                ].map((tx, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 p-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                    <span>{tx.type}</span>
                    <span className={tx.amount.startsWith("+") ? "text-green-400" : ""}>{tx.amount}</span>
                    <span className="text-green-500">{tx.status}</span>
                    <span className="text-muted-foreground">{tx.date}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}