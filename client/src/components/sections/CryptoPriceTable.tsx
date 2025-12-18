import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

const INITIAL_DATA: Crypto[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 98450.20, change: 2.4 },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 3850.15, change: 1.8 },
  { id: "sol", name: "Solana", symbol: "SOL", price: 145.60, change: -0.5 },
  { id: "bnb", name: "Binance Coin", symbol: "BNB", price: 610.20, change: 0.2 },
  { id: "xrp", name: "Ripple", symbol: "XRP", price: 1.12, change: 5.1 },
  { id: "ada", name: "Cardano", symbol: "ADA", price: 0.75, change: -1.2 },
  { id: "dot", name: "Polkadot", symbol: "DOT", price: 8.90, change: 3.4 },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.18, change: 8.5 },
];

export function CryptoPriceTable() {
  const [data, setData] = useState<Crypto[]>(INITIAL_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => prevData.map(crypto => {
        const volatility = 0.002; // 0.2% max change per tick
        const change = 1 + (Math.random() * volatility * 2 - volatility);
        return {
          ...crypto,
          price: crypto.price * change,
          change: crypto.change + (Math.random() * 0.2 - 0.1)
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text-primary">LIVE MARKET DATA</h2>
          <div className="flex items-center justify-center gap-2 text-green-500 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-mono">LIVE SOCKET CONNECTION ACTIVE</span>
          </div>
        </div>

        <GlassCard className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-display text-muted-foreground">ASSET</th>
                <th className="text-right p-4 font-display text-muted-foreground">PRICE</th>
                <th className="text-right p-4 font-display text-muted-foreground">24H CHANGE</th>
                <th className="text-right p-4 font-display text-muted-foreground">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((crypto) => (
                <tr key={crypto.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-black">
                        {crypto.symbol[0]}
                      </div>
                      <div>
                        <div className="font-bold">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-lg">
                    ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`p-4 text-right font-mono ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <div className="flex items-center justify-end gap-1">
                      {crypto.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      {Math.abs(crypto.change).toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-4 py-1.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors text-xs font-bold uppercase tracking-wider">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </section>
  );
}